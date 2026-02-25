import os
import glob
import pandas as pd
import json
import numpy as np

# Define the source directory and necessary columns
SOURCE_DIR = r"D:\01. NTB\H23_Data Nota Service PowerBI"
OUTPUT_DIR = r"d:\AntiGravity\Project04\data"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

COLUMNS_TO_KEEP = [
    'Tgl Faktur', 'Total Faktur', 'PPN', 'Diskon', 'Gross Profit', 
    'No PKB', 'Nama Tipe Kedatangan', 'Tipe PKB', 'Nama Service Advisor', 'Nama Mekanik',
    'No Part', 'Nama Jasa/Part', 'Jumlah', 'Jenis', 'CM SAP',
    'Nama Pembayar', 'KM Sekarang', 'Tahun Rakit', 'Kecamatan Pemilik', 
    'Kabupaten Pemilik', 'Nama Pemilik', 'Sales', 'Harga Part', 
    'Nama Motor', 'Sumber Booking', 'Jam Cetak PKB'
]

def format_date(df):
    try:
        df['Tgl Faktur'] = pd.to_datetime(df['Tgl Faktur'], dayfirst=True, errors='coerce').dt.strftime('%b %d')
    except Exception as e:
        print(f"Warning: Could not parse dates: {e}")
    return df

def get_customer_class(pembayar):
    if pd.isna(pembayar): 
        return 'Regular'
    p = str(pembayar).upper()
    group_indicators = ['PT ', 'PT.', 'CV ', 'CV.', 'KOPERASI', 'BPR ', 'BANK ', 'DINAS ', 'YAYASAN ', 'TOKO ', 'UD ', 'UD.']
    for ind in group_indicators:
        if ind in p:
            return 'Group'
    return 'Regular'

def process_files():
    print(f"Scanning for Excel files in {SOURCE_DIR}...")
    files = []
    for ext in ["*.xlsx", "*.xls", "*.csv"]:
        files.extend(glob.glob(os.path.join(SOURCE_DIR, "**", ext), recursive=True))

    if not files:
        print("No Excel files found! Please check the directory path.")
        return

    print(f"Found {len(files)} files. Starting compression...")
    
    dfs = []
    for f in files:
        print(f"Reading {os.path.basename(f)}...")
        try:
            if f.endswith('.csv'):
                df = pd.read_csv(f, usecols=lambda c: c in COLUMNS_TO_KEEP)
            else:
                df = pd.read_excel(f, usecols=lambda c: c in COLUMNS_TO_KEEP)
            
            df.dropna(how='all', inplace=True)
            dfs.append(df)
        except Exception as e:
            print(f"Error reading {f}: {e}")

    if not dfs:
        print("No valid data extracted.")
        return

    master_df = pd.concat(dfs, ignore_index=True)
    print(f"Combined data shape: {master_df.shape}")

    for col in COLUMNS_TO_KEEP:
        if col not in master_df.columns:
            master_df[col] = 0 if col in ['Total Faktur', 'PPN', 'Diskon', 'Gross Profit', 'Jumlah', 'KM Sekarang', 'Tahun Rakit'] else "Unknown"

    numeric_cols = ['Gross Profit', 'Total Faktur', 'PPN', 'Diskon', 'Jumlah', 'KM Sekarang']
    for col in numeric_cols:
        master_df[col] = pd.to_numeric(master_df[col], errors='coerce').fillna(0)

    # Classify Customer
    master_df['Customer Class'] = master_df['Nama Pembayar'].apply(get_customer_class)
    
    master_df['Revenue'] = master_df['Total Faktur'] - master_df['PPN']
    master_df['COGS'] = master_df['Revenue'] - master_df['Gross Profit']
    master_df = format_date(master_df)

    # Save Compressed CSV
    csv_path = os.path.join(OUTPUT_DIR, "compressed_data.csv")
    master_df.to_csv(csv_path, index=False)
    print(f"Saved Shrunk CSV: {csv_path}")

    # Aggregations
    print("Pre-aggregating advanced dashboard data...")
    generate_dashboard_json(master_df)
    
    print("Pre-aggregating Revenue Trend dashboard data...")
    generate_revenue_dashboard_json(master_df)

def generate_revenue_dashboard_json(df):
    """Generates the specific JSON payload required for the Revenue Trend Dashboard."""
    # Ensure Tgl Faktur is workable datetime
    df['DateObj'] = pd.to_datetime(df['Tgl Faktur'], format='%b %d', errors='coerce').apply(lambda d: d.replace(year=2024) if not pd.isna(d) else d)
    df['Month'] = df['DateObj'].dt.month
    df['MonthName'] = df['DateObj'].dt.strftime('%b')

    # Remove totally bunk dates
    valid_df = df.dropna(subset=['Month']).copy()

    # Get distinct CM SAP for the global filter
    workshops = valid_df['CM SAP'].dropna().unique().tolist()
    if "" in workshops: workshops.remove("")

    # 1. Master Monthly Trend & Segments (Group vs Regular)
    # Aggregate metrics per month per CM SAP per Customer Class
    monthly_agg = valid_df.groupby(['Month', 'MonthName', 'CM SAP', 'Customer Class']).agg({
        'Revenue': 'sum',
        'Gross Profit': 'sum',
        'Total Faktur': 'sum',
        'Diskon': 'sum',
        'PPN': 'sum'
    }).reset_index()

    # We need a structured format so the UI can filter efficiently:
    # { "CM SAP A": { "Jan": { "Regular": {rev, gp}, "Group": {rev, gp} } } }
    
    master_dict = {}
    master_dict["All_Workshops"] = {} # Pre-calculate "All"
    for w in workshops:
        master_dict[str(w)] = {}

    for _, r in monthly_agg.iterrows():
        w = str(r['CM SAP'])
        m = str(r['MonthName'])
        c = str(r['Customer Class'])

        # Store in Specific Workshop
        if m not in master_dict[w]:
            master_dict[w][m] = {}
        master_dict[w][m][c] = {
            "revenue": float(r['Revenue']),
            "gp": float(r['Gross Profit']),
            "discount": float(r['Diskon']),
            "dpp": float(r['Revenue']) # DPP is Revenue
        }

        # Accumulate into "All_Workshops"
        if m not in master_dict["All_Workshops"]:
            master_dict["All_Workshops"][m] = {"Regular": {"revenue": 0, "gp": 0, "discount": 0, "dpp": 0}, "Group": {"revenue": 0, "gp": 0, "discount": 0, "dpp": 0}}
        
        master_dict["All_Workshops"][m][c]["revenue"] += float(r['Revenue'])
        master_dict["All_Workshops"][m][c]["gp"] += float(r['Gross Profit'])
        master_dict["All_Workshops"][m][c]["discount"] += float(r['Diskon'])
        master_dict["All_Workshops"][m][c]["dpp"] += float(r['Revenue'])

    # 2. Service Mix (Jenis vs GP) - Global totals
    service_mix = valid_df.groupby('Jenis')['Gross Profit'].sum().reset_index()
    service_mix_json = [{"name": str(r['Jenis']), "value": float(r['Gross Profit'])} for _, r in service_mix.iterrows() if r['Gross Profit'] > 0]
    
    # Take top 4, group rest into "Other"
    service_mix_json.sort(key=lambda x: x["value"], reverse=True)
    if len(service_mix_json) > 4:
        top_4 = service_mix_json[:4]
        other_val = sum(x["value"] for x in service_mix_json[4:])
        top_4.append({"name": "Other", "value": other_val})
        service_mix_json = top_4

    # Compile the final payload
    payload = {
        "workshops": ["All Workshops"] + workshops,
        "monthlyData": master_dict,
        "serviceMixGP": service_mix_json
    }

    output_path = os.path.join(OUTPUT_DIR, "revenue_dashboard_data.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, indent=4)
    print(f"Revenue Dashboard JSON generated at: {output_path}")

def generate_dashboard_json(df):
    # Base KPIs
    unit_entry = df['No PKB'].nunique() if 'No PKB' in df.columns else 0
    total_rev = df['Revenue'].sum()
    total_gp = df['Gross Profit'].sum()
    gp_margin = (total_gp / total_rev * 100) if total_rev > 0 else 0

    # 1. Revenue Segmentation
    rev_seg = df.groupby('Customer Class').agg({'Revenue': 'sum', 'Gross Profit': 'sum', 'No PKB': 'nunique', 'Total Faktur': 'sum'}).reset_index()
    rev_seg_json = []
    for _, r in rev_seg.iterrows():
        rev_seg_json.append({
            "class": r['Customer Class'],
            "revenue": round(r['Revenue']/1000000, 2),
            "gp": round(r['Gross Profit']/1000000, 2),
            "avg_trx": round((r['Total Faktur'] / r['No PKB'])/1000, 2) if r['No PKB'] > 0 else 0
        })

    # 2. Visit Behavior & Trends
    trends = df.groupby(['Tgl Faktur', 'Customer Class'])['Revenue'].sum().unstack(fill_value=0).reset_index()
    trends = trends.tail(15) # Last 15 days
    trend_json = [{"date": str(r['Tgl Faktur']), "Regular": round(r.get('Regular', 0)/1000000, 2), "Group": round(r.get('Group', 0)/1000000, 2)} for _, r in trends.iterrows()]

    # Visit Type Mix
    visit_mix = df.groupby(['Customer Class', 'Nama Tipe Kedatangan']).size().unstack(fill_value=0).reset_index()
    visit_mix_json = visit_mix.to_dict('records')

    # Peak Heatmap (parse hour)
    heatmap_json = []
    if 'Jam Cetak PKB' in df.columns:
        df['Hour'] = pd.to_datetime(df['Jam Cetak PKB'], errors='coerce').dt.hour
        hour_dist = df.dropna(subset=['Hour']).groupby(['Customer Class', 'Hour']).size().reset_index(name='count')
        for h in range(7, 18): # 7 AM to 5 PM
            reg_val = hour_dist[(hour_dist['Customer Class'] == 'Regular') & (hour_dist['Hour'] == h)]['count'].sum()
            grp_val = hour_dist[(hour_dist['Customer Class'] == 'Group') & (hour_dist['Hour'] == h)]['count'].sum()
            heatmap_json.append({"hour": f"{h}:00", "Regular": int(reg_val), "Group": int(grp_val)})

    # 3. Spending Patterns
    spend_pattern = df.groupby('Customer Class').agg({'Diskon': 'mean', 'Total Faktur': 'mean'}).reset_index()
    spend_json = [{"class": r['Customer Class'], "avg_discount": round(r['Diskon']), "avg_faktur": round(r['Total Faktur'])} for _, r in spend_pattern.iterrows()]

    # 4. Motorcycle Profile
    moto_profile = {}
    for c_class in ['Regular', 'Group']:
        top_motors = df[df['Customer Class'] == c_class].groupby('Nama Motor').size().nlargest(5).to_dict()
        avg_km = df[df['Customer Class'] == c_class]['KM Sekarang'].mean()
        # Clean Tahun Rakit to numeric
        tahun_df = pd.to_numeric(df[df['Customer Class'] == c_class]['Tahun Rakit'], errors='coerce')
        avg_year = tahun_df.mean()
        
        moto_profile[c_class] = {
            "top_models": top_motors,
            "avg_km": round(avg_km) if not pd.isna(avg_km) else 0,
            "avg_year": round(avg_year) if not pd.isna(avg_year) else 0
        }

    # 5. Retention & Loyalty
    retention_json = {}
    for c_class in ['Regular', 'Group']:
        class_df = df[df['Customer Class'] == c_class]
        # Count unique PKB per Nama Pemilik
        visits_per_cust = class_df.groupby('Nama Pemilik')['No PKB'].nunique()
        total_cust = len(visits_per_cust)
        repeat_cust = len(visits_per_cust[visits_per_cust > 1])
        retention_json[c_class] = {
            "repeat_rate": round((repeat_cust / total_cust * 100), 1) if total_cust > 0 else 0,
            "total_customers": total_cust
        }

    # 6. Geography
    geo_df = df.groupby(['Kabupaten Pemilik', 'Customer Class']).size().unstack(fill_value=0).reset_index()
    geo_df['Total'] = geo_df.get('Regular', 0) + geo_df.get('Group', 0)
    geo_df = geo_df.sort_values('Total', ascending=False).head(10)
    geo_json = [{"kabupaten": str(r['Kabupaten Pemilik']), "Regular": int(r.get('Regular', 0)), "Group": int(r.get('Group', 0))} for _, r in geo_df.iterrows()]

    # 7. Staff Allocation
    sa_split = df.groupby(['Nama Service Advisor', 'Customer Class'])['Revenue'].sum().unstack(fill_value=0).reset_index()
    sa_split['Total'] = sa_split.get('Regular', 0) + sa_split.get('Group', 0)
    sa_split = sa_split.sort_values('Total', ascending=False).head(8)
    sa_json = [{"name": str(r['Nama Service Advisor'])[:15], "Regular": round(r.get('Regular', 0)/1000000, 2), "Group": round(r.get('Group', 0)/1000000, 2)} for _, r in sa_split.iterrows()]

    # Consolidate
    dashboard_data = {
        "kpis": {
            "revenue": round(total_rev / 1000000, 2),
            "gp": round(total_gp / 1000000, 2),
            "units": unit_entry,
            "margin": round(gp_margin, 1)
        },
        "segmentation": rev_seg_json,
        "trends": trend_json,
        "visitMix": visit_mix_json,
        "heatmap": heatmap_json,
        "spending": spend_json,
        "motorProfile": moto_profile,
        "retention": retention_json,
        "geography": geo_json,
        "staffAllocation": sa_json
    }

    json_path = os.path.join(OUTPUT_DIR, "advanced_dashboard_data.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, default=str, indent=4)
    print(f"Advanced Analytics JSON generated at: {json_path}")

if __name__ == "__main__":
    process_files()
