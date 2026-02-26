import React from 'react';

const VisitFrequencyFunnel = ({ visitFrequency }) => {
    if (!visitFrequency || visitFrequency.length === 0) return null;

    const colors = [
        'var(--danger-red)',
        'var(--accent-orange)',
        'var(--accent-cyan)',
        'var(--accent-green)',
        'var(--accent-green)'
    ];

    const maxCount = Math.max(...visitFrequency.map(f => f.count));
    const totalCustomers = visitFrequency.reduce((sum, f) => sum + f.count, 0);
    const singleVisitPct = totalCustomers > 0 ? Math.round((visitFrequency[0].count / totalCustomers) * 100) : 0;

    const funnel = visitFrequency.map((f, i) => ({
        ...f,
        color: colors[i] || 'var(--text-muted)',
        max: maxCount
    }));

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Visit Frequency</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>No PKB count per customer</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>FREQ</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {funnel.map(f => {
                    const pct = (f.count / f.max) * 100;
                    return (
                        <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ width: '80px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{f.label}</span>
                            <div style={{ flex: 1, position: 'relative', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute', top: 0, bottom: 0, left: 0,
                                    width: `${pct}%`,
                                    background: f.color,
                                    display: 'flex', alignItems: 'center', paddingLeft: '0.5rem',
                                    fontWeight: 600, color: (f.color.includes('green') || f.color.includes('cyan')) ? '#000' : '#fff'
                                }}>
                                    {f.count.toLocaleString()}
                                    {f.label === '12+ visits' && ' ★'}
                                </div>
                            </div>
                            <span style={{ width: '50px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{f.count.toLocaleString()}</span>
                        </div>
                    )
                })}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '0.8rem', background: 'rgba(255, 80, 80, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--danger-red)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--danger-red)' }}>⚠ {singleVisitPct}%</span> of customers visited only once — key retention opportunity</p>
            </div>
        </div>
    );
};

export default VisitFrequencyFunnel;
