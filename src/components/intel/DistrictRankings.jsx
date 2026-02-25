import React from 'react';

const DistrictRankings = ({ geo }) => {
    // Generate inline bars for the mix if we don't have explicit split in python yet
    // Ensure geo exists or use massive mock for demo visuals
    const defaultData = [
        { kab: 'Kab. Bandung', cust: 1284, revStr: '2.84B', color: 'var(--accent-cyan)', gPct: 30, rPct: 70 },
        { kab: 'Kab. Bekasi', cust: 842, revStr: '1.72B', color: 'var(--accent-cyan)', gPct: 40, rPct: 60 },
        { kab: 'Kab. Bogor', cust: 620, revStr: '1.28B', color: 'var(--accent-cyan)', gPct: 60, rPct: 40 },
        { kab: 'Kota Bandung', cust: 510, revStr: '1.04B', color: 'var(--accent-green)', gPct: 55, rPct: 45 },
        { kab: 'Kab. Sumedang', cust: 388, revStr: '780M', color: 'var(--text-muted)', gPct: 45, rPct: 55 },
        { kab: 'Kota Cimahi', cust: 286, revStr: '572M', color: 'var(--text-muted)', gPct: 20, rPct: 80 },
        { kab: 'Kab. Karawang', cust: 212, revStr: '432M', color: 'var(--accent-orange)', gPct: 70, rPct: 30, highlight: true },
        { kab: 'Kab. Purwakarta', cust: 128, revStr: '256M', color: 'var(--text-muted)', gPct: 60, rPct: 40 },
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>District Rankings</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Revenue, customers & segment per Kab</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>RANK</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', textAlign: 'left', letterSpacing: 1 }}>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400 }}>#</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400 }}>KABUPATEN</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'right' }}>CUST</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'right' }}>REVENUE</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'center' }}>MIX</th>
                    </tr>
                </thead>
                <tbody>
                    {defaultData.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '0.8rem 0', color: row.highlight ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                                0{idx + 1}{row.highlight && '★'}
                            </td>
                            <td style={{ padding: '0.8rem 0', color: '#ececec' }}>{row.kab}</td>
                            <td style={{ padding: '0.8rem 0', textAlign: 'right', color: 'var(--text-muted)' }}>{row.cust.toLocaleString()}</td>
                            <td style={{ padding: '0.8rem 0', textAlign: 'right', color: row.color, fontWeight: 600 }}>{row.revStr}</td>
                            <td style={{ padding: '0.8rem 0', textAlign: 'center' }}>
                                <div style={{ display: 'inline-flex', width: '40px', height: '6px', overflow: 'hidden', borderRadius: '3px' }}>
                                    <div style={{ width: `${row.gPct}%`, background: 'var(--accent-purple)' }}></div>
                                    <div style={{ width: `${row.rPct}%`, background: 'var(--accent-cyan)' }}></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DistrictRankings;
