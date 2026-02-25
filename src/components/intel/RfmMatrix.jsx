import React from 'react';

const RfmMatrix = ({ rfmData }) => {
    // Layout matrix manually:
    // Rows: Recency Score (5 to 1)
    // Cols: Frequency Score (1 to 5)

    const matrix = [
        // R=5 (Best Recency)
        [{ r: 5, f: 1, label: 'Promising', color: 'rgba(0,242,254,0.3)', text: 'var(--accent-cyan)' },
        { r: 5, f: 2, label: 'Recent', color: 'rgba(0,242,254,0.4)', text: 'var(--accent-cyan)' },
        { r: 5, f: 3, label: 'Potential', color: 'rgba(0,242,254,0.6)', text: '#fff' },
        { r: 5, f: 4, label: 'Loyal', color: 'rgba(0,242,254,0.8)', text: '#000' },
        { r: 5, f: 5, label: 'Champions', color: 'var(--accent-green)', text: '#000' }],

        // R=4
        [{ r: 4, f: 1, label: 'Hibernate', color: 'rgba(255,165,0,0.1)', text: 'var(--accent-orange)' },
        { r: 4, f: 2, label: 'Can\'t Lose', color: 'rgba(255,165,0,0.2)', text: 'var(--accent-orange)' },
        { r: 4, f: 3, label: 'About Sleep', color: 'rgba(255,165,0,0.4)', text: 'var(--accent-orange)' },
        { r: 4, f: 4, label: 'Needs Attn', color: 'rgba(0,242,254,0.4)', text: 'var(--accent-cyan)' },
        { r: 4, f: 5, label: 'Price Loyal', color: 'rgba(0,242,254,0.6)', text: '#fff' }],

        // R=3 
        [{ r: 3, f: 1, label: 'Lost Reg', color: 'rgba(255,80,80,0.1)', text: 'var(--danger-red)' },
        { r: 3, f: 2, label: 'Lost HV', color: 'rgba(255,80,80,0.2)', text: 'var(--danger-red)' },
        { r: 3, f: 3, label: 'Low Engage', color: 'rgba(255,165,0,0.2)', text: 'var(--accent-orange)' },
        { r: 3, f: 4, label: 'At Risk', color: 'rgba(255,165,0,0.4)', text: 'var(--accent-orange)' },
        { r: 3, f: 5, label: 'Mid Loyal', color: 'rgba(0,242,254,0.3)', text: 'var(--accent-cyan)' }],

        // R=2
        [{ r: 2, f: 1, label: 'Gone', color: 'rgba(255,255,255,0.03)', text: 'var(--text-muted)' },
        { r: 2, f: 2, label: 'Dormant', color: 'rgba(255,80,80,0.1)', text: 'var(--danger-red)' },
        { r: 2, f: 3, label: 'Deep Risk', color: 'rgba(255,80,80,0.3)', text: 'var(--danger-red)' },
        { r: 2, f: 4, label: 'Churn Risk', color: 'rgba(255,80,80,0.5)', text: '#fff' },
        { r: 2, f: 5, label: 'Lapsed F', color: 'rgba(255,165,0,0.4)', text: '#fff' }],

        // R=1 (Worst Recency)
        [{ r: 1, f: 1, label: 'Ghost', color: 'rgba(255,255,255,0.02)', text: 'var(--text-muted)' },
        { r: 1, f: 2, label: 'Minimal', color: 'rgba(255,255,255,0.04)', text: 'var(--text-muted)' },
        { r: 1, f: 3, label: 'Inactive', color: 'rgba(255,255,255,0.06)', text: 'var(--text-muted)' },
        { r: 1, f: 4, label: 'Lapsed', color: 'rgba(255,80,80,0.2)', text: 'var(--danger-red)' },
        { r: 1, f: 5, label: 'One-Time', color: 'rgba(255,80,80,0.3)', text: 'var(--danger-red)' }]
    ];

    const getCount = (r, f) => {
        if (!rfmData) return 0;
        const cell = rfmData.find(d => d.R === r && d.F === f);
        return cell ? cell.count : 0;
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>RFM Customer Matrix</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Recency • Frequency • Monetary — cluster</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>RFM</div>
            </div>

            <div style={{ display: 'flex', flex: 1 }}>

                {/* Y-Axis Label */}
                <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top', marginTop: '10rem', height: 20, width: 220, textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: 1 }}>
                    ← Recency [Recent]
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {matrix.map((row, rIdx) => (
                        <div key={rIdx} style={{ display: 'flex', gap: '4px', flex: 1 }}>
                            {row.map((col, cIdx) => {
                                const count = getCount(col.r, col.f);
                                return (
                                    <div
                                        key={cIdx}
                                        style={{
                                            flex: 1,
                                            background: col.color,
                                            borderRadius: '4px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '0.5rem',
                                            transition: 'transform 0.2s',
                                            cursor: 'pointer',
                                            border: '1px solid rgba(255,255,255,0.02)'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{count}</span>
                                        <span style={{ fontSize: '0.65rem', color: col.text, textAlign: 'center', marginTop: '2px', fontWeight: 600, letterSpacing: 0.5 }}>{col.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                    {/* X-Axis Label */}
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                        {[1, 2, 3, 4, '5+'].map(lbl => (
                            <div key={lbl} style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>F {lbl}</div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-green)', borderRadius: '2px' }}></div> Champions</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-cyan)', borderRadius: '2px' }}></div> Loyal / Needs Attn</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-orange)', borderRadius: '2px' }}></div> At Risk</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--danger-red)', borderRadius: '2px' }}></div> Churned</div>
            </div>

        </div>
    );
};

export default RfmMatrix;
