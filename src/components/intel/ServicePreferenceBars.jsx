import React from 'react';

const ServicePreferenceBars = () => {
    // Mock data for Service Types based on design
    const prefs = [
        { name: 'Periodic Service', gPct: 62, rPct: 42, gCol: 'var(--accent-purple)', rCol: 'var(--accent-cyan)' },
        { name: 'General Repair', gPct: 21, rPct: 34, gCol: 'var(--accent-purple)', rCol: 'var(--accent-cyan)' },
        { name: 'Spare Parts Only', gPct: 12, rPct: 18, gCol: 'var(--accent-purple)', rCol: 'var(--accent-cyan)' },
        { name: 'Body / Recall', gPct: 5, rPct: 6, gCol: 'var(--accent-purple)', rCol: 'var(--accent-cyan)' },
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Service Preference</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Jenis per segment</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>SERVICE</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {prefs.map(p => (
                    <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#ececec', fontWeight: 600 }}>{p.name}</span>
                            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem' }}>
                                <span style={{ color: p.gCol }}>{p.gPct}%</span>
                                <span style={{ color: p.rCol }}>{p.rPct}%</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                            {/* Group Left Bar */}
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${p.gPct}%`, background: p.gCol, borderRadius: '3px', boxShadow: `0 0 8px ${p.gCol}` }}></div>
                            </div>
                            {/* Regular Right Bar */}
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${p.rPct}%`, background: p.rCol, borderRadius: '3px', boxShadow: `0 0 8px ${p.rCol}` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 4, background: 'var(--accent-purple)', borderRadius: '2px' }}></div> Group</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 4, background: 'var(--accent-cyan)', borderRadius: '2px' }}></div> Regular</div>
            </div>
        </div>
    );
};

export default ServicePreferenceBars;
