import os
import glob
import pandas as pd
import json

# Define the source directory and necessary columns
SOURCE_DIR = r"D:\01. NTB\H23_Data Nota Service PowerBI"
OUTPUT_DIR = r"d:\AntiGravity\Project04\data"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

COLUMNS_TO_KEEP = [
    'Tgl Faktur', 'Total Faktur', 'PPN', 'Diskon', 'Gross Profit', 
    'No PKB', 'Nama Tipe Kedatangan', 'Tipe PKB', 'Nama Service Advisor', 
    'No Part', 'Nama Jasa/Part', 'Jumlah', 'Jenis', 'CM SAP'
]

def format_date(df):
    try:
        df['Tgl Faktur'] = pd.to_datetime(df['Tgl Faktur'], dayfirst=True, errors='coerce').dt.strftime('%b %d')
    except Exception as e:
        print(f"Warning: Could not parse dates: {e}")
    return df

def process_files():
    print(f"Scanning for Excel files in {SOURCE_DIR}...")
    # Find all excel and csv files
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
            
            # Drop purely empty rows
            df.dropna(how='all', inplace=True)
            dfs.append(df)
        except Exception as e:
            print(f"Error reading {f}: {e}")

    if not dfs:
        print("No valid data extracted.")
        return

    # Combine all
    master_df = pd.concat(dfs, ignore_index=True)
    print(f"Combined data shape: {master_df.shape}")

    # Ensure all required columns exist even if some are missing in files
    for col in COLUMNS_TO_KEEP:
        if col not in master_df.columns:
            master_df[col] = 0 if col in ['Total Faktur', 'PPN', 'Diskon', 'Gross Profit', 'Jumlah'] else "Unknown"

    # Fill NaNs
    master_df['Gross Profit'] = master_df['Gross Profit'].fillna(0)
    master_df['Total Faktur'] = master_df['Total Faktur'].fillna(0)
    master_df['PPN'] = master_df['PPN'].fillna(0)
    master_df['Diskon'] = master_df['Diskon'].fillna(0)
    master_df['Jumlah'] = master_df['Jumlah'].fillna(0)
    
    # Create Revenue field: Revenue = Total Faktur - PPN
    master_df['Revenue'] = master_df['Total Faktur'] - master_df['PPN']
    # Calculate COGS via: COGS = Revenue - Gross Profit
    master_df['COGS'] = master_df['Revenue'] - master_df['Gross Profit']

    master_df = format_date(master_df)

    # 1. Save Highly Compressed CSV for Supabase Upload 
    csv_path = os.path.join(OUTPUT_DIR, "compressed_data.csv")
    master_df.to_csv(csv_path, index=False)
    print(f"Saved Shrunk CSV for Supabase: {csv_path} ({os.path.getsize(csv_path) / (1024*1024):.2f} MB)")

    # 2. Extract aggregated metrics to JSON for the frontend app
    print("Pre-aggregating dashboard data...")
    generate_dashboard_json(master_df)

def generate_dashboard_json(df):
    # Total distinct Unit Entries
    unit_entry = df['No PKB'].nunique() if 'No PKB' in df.columns else 0
    total_rev = df['Revenue'].sum()
    total_gp = df['Gross Profit'].sum()
    gp_margin = (total_gp / total_rev * 100) if total_rev > 0 else 0

    # Financial flow items
    total_faktur = df['Total Faktur'].sum()
    total_diskon = df['Diskon'].sum()
    total_ppn = df['PPN'].sum()
    total_dpp = total_rev # DPP is Revenue
    total_cogs = df['COGS'].sum()

    # Daily trends (Revenue & GP)
    trends = df.groupby('Tgl Faktur')[['Revenue', 'Gross Profit']].sum().reset_index()
    # Sort dates (assuming they are formatted cleanly, otherwise sort normally)
    trends = trends.tail(10) # last 10 days for example
    trends_json = [{"date": str(r['Tgl Faktur']), "revenue": round(r['Revenue']/1000000, 2), "gp": round(r['Gross Profit']/1000000, 2)} for _, r in trends.iterrows()]

    # Service Mix (Nama Tipe Kedatangan by Tipe PKB)
    mix_df = df.groupby(['Nama Tipe Kedatangan', 'Tipe PKB']).size().reset_index(name='count')
    # Reshaping for stacked bars
    mix_json = []
    for t_kedat in mix_df['Nama Tipe Kedatangan'].unique():
        if pd.isna(t_kedat): continue
        entry = {"type": str(t_kedat)[:15]} # truncated
        for _, r in mix_df[mix_df['Nama Tipe Kedatangan'] == t_kedat].iterrows():
            if not pd.isna(r['Tipe PKB']):
                entry[str(r['Tipe PKB'])] = int(r['count'])
        mix_json.append(entry)

    # Resource ranking
    sa_df = df.groupby('Nama Service Advisor').agg({'Revenue': 'sum', 'No PKB': 'nunique'}).reset_index()
    sa_df = sa_df.sort_values(by=['Revenue', 'No PKB'], ascending=False).head(5)
    sa_json = [{"id": f"0{i+1}", "name": str(r['Nama Service Advisor']), "units": int(r['No PKB']), "revenue": round(r['Revenue']/1000000, 2)} for i, r in sa_df.iterrows()]

    # Parts Favorites (filter by Jenis == Part if possible)
    # Filter pure empty or unknown
    parts_df = df[(~df['No Part'].isna()) & (df['No Part'].astype(str) != 'Unknown') & (df['No Part'].astype(str) != '')]
    parts_fav = parts_df.groupby(['No Part', 'Nama Jasa/Part'])['Jumlah'].sum().reset_index()
    parts_fav = parts_fav.sort_values(by='Jumlah', ascending=False).head(5)
    parts_json = [{"no": str(r['No Part'])[:8], "part": str(r['Nama Jasa/Part']), "qty": int(r['Jumlah']), "trend": "+0%"} for _, r in parts_fav.iterrows()]

    dashboard_data = {
        "kpis": {
            "revenue": round(total_rev / 1000000, 2), # In Jt
            "gp": round(total_gp / 1000000, 2), # In Jt
            "units": unit_entry,
            "margin": round(gp_margin, 1)
        },
        "financialFlow": {
            "faktur": round(total_faktur / 1000000, 2),
            "diskon": round(total_diskon / 1000000, 2),
            "ppn": round(total_ppn / 1000000, 2),
            "dpp": round(total_dpp / 1000000, 2),
            "cogs": round(total_cogs / 1000000, 2),
            "gp": round(total_gp / 1000000, 2)
        },
        "trends": trends_json,
        "serviceMix": mix_json[:5], # top 5
        "ranking": sa_json,
        "parts": parts_json
    }

    json_path = os.path.join(OUTPUT_DIR, "dashboard_data.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, indent=4)
    print(f"Aggregated JSON generated at: {json_path}")

if __name__ == "__main__":
    process_files()
