import React from 'react';

const DistrictReachHeatmap = () => {
    // Generate a beautiful, mockup-accurate mock grid for District Reach since we don't have lat/long for exact spatial projection.
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const kabs = [
        "Kab. Bandung",
        "Kab. Bekasi",
        "Kab. Bogor",
        "Kota Bandung",
        "Kab. Sumedang",
        "Kota Cimahi",
        "Kab. Karawang"
    ];

    const getIntensity = (val) => {
        if (val > 800) return 'rgba(0, 242, 254, 1)';
        if (val > 500) return 'rgba(0, 242, 254, 0.7)';
        if (val > 300) return 'rgba(0, 242, 254, 0.5)';
        if (val > 100) return 'rgba(0, 242, 254, 0.3)';
        if (val > 50) return 'rgba(0, 242, 254, 0.15)';
        return 'rgba(255, 255, 255, 0.05)';
    };

    const mockData = kabs.map(kab => {
        let base = Math.floor(Math.random() * 500) + 100;
        if (kab === 'Kab. Bandung') base = 900;
        if (kab === 'Kab. Karawang') base = 50; // emerging

        return {
            kab,
            data: [...Array(12)].map((_, i) => {
                let val = base + (Math.random() * 200 - 100);
                if (kab === 'Kab. Karawang') val += (i * 20); // trend up
                return Math.max(10, Math.floor(val));
            })
        }
    });

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>District Reach Timeline</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Customer active volume per Kab by Month</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>REACH</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: 1 }}>
                        <th style={{ padding: '0 0.5rem 0.5rem 0', textAlign: 'left', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>KABUPATEN</th>
                        {monthNames.map(m => (
                            <th key={m} style={{ padding: '0 0 0.5rem 0', textAlign: 'center', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((row) => (
                        <tr key={row.kab}>
                            <td style={{ padding: '0.6rem 0.5rem 0.6rem 0', color: '#ececec', fontWeight: 500 }}>
                                {row.kab}
                            </td>
                            {row.data.map((val, i) => (
                                <td key={i} style={{ padding: '0.1rem' }}>
                                    <div style={{
                                        background: getIntensity(val),
                                        color: val > 600 ? '#000' : 'transparent',
                                        padding: '0.4rem 0.2rem',
                                        borderRadius: '2px',
                                        textAlign: 'center',
                                        fontSize: '0.65rem',
                                        fontWeight: 600,
                                        transition: '0.2s',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = val > 600 ? '#000' : '#fff';
                                            e.currentTarget.innerText = val;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = val > 600 ? '#000' : 'transparent';
                                            e.currentTarget.innerText = val > 600 ? val : '';
                                        }}
                                    >
                                        {val > 600 ? val : ''}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DistrictReachHeatmap;
