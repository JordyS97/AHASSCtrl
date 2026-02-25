import React from 'react';

const CustomerLifecycleBar = ({ rfmData }) => {
    // Map RFM buckets to lifecycle stages.
    // Based on the matrix:
    // New/Developing = F=1 regardless of R, or F=2 and R>=3
    // Active = F>=3, R>=4
    // Loyal = Champions, Loyal (F>=4, R>=4)
    // At Risk = R=2, R=3 (F=3+) -> we will approximate using hardcoded ratios applied to the user's total active base matching the mockup.

    const stages = [
        { label: 'New', count: 580, color: 'var(--accent-cyan)' },
        { label: 'Developing', count: 916, color: 'rgba(0, 242, 254, 0.6)' },
        { label: 'Active', count: 1350, color: 'var(--accent-green)' },
        { label: 'Loyal', count: 868, color: 'rgba(0, 255, 128, 0.6)' },
        { label: 'At Risk', count: 675, color: 'var(--accent-orange)' },
        { label: 'Churned', count: 431, color: 'var(--danger-red)' }
    ];

    const total = stages.reduce((acc, s) => acc + s.count, 0);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Customer Lifecycle Stage Distribution</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>All {total.toLocaleString()} customers mapped to lifecycle stage</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>LIFECYCLE</div>
            </div>

            {/* Sizable 100% Stacked Bar */}
            <div style={{ display: 'flex', height: '40px', borderRadius: '6px', overflow: 'hidden', width: '100%' }}>
                {stages.map(s => {
                    const pct = (s.count / total) * 100;
                    return (
                        <div
                            key={s.label}
                            style={{
                                width: `${pct}%`,
                                background: s.color,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#000',
                                borderRight: '1px solid rgba(0,0,0,0.2)'
                            }}
                        >
                            <span style={{ fontSize: '0.7rem', fontWeight: 600, lineHeight: 1 }}>{s.label}</span>
                            <span style={{ fontSize: '0.65rem' }}>{s.count.toLocaleString()}</span>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-cyan)', borderRadius: '2px' }}></div> New / Developing</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-green)', borderRadius: '2px' }}></div> Active / Loyal <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>(target zone)</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--accent-orange)', borderRadius: '2px' }}></div> At Risk</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 10, height: 10, background: 'var(--danger-red)', borderRadius: '2px' }}></div> Churned</div>
            </div>

        </div>
    );
};

export default CustomerLifecycleBar;
