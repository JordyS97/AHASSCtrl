import React from 'react';

const getInitials = (name) => {
    const parts = name.trim().split(' ');
    return parts[0]; // Just return first name to save space
};

const SaWorkloadDistribution = ({ saList }) => {
    if (!saList || saList.length === 0) return null;

    // Based on standard ~320 PKB/mo * 12 mos = 3840 Target Capacity
    const TARGET_CAPACITY = 3840;

    // Take top 8 SAs to fit panel nicely
    const displayList = saList.slice(0, 8);

    // Color gradient mapping based on load%
    const getColor = (pct) => {
        if (pct >= 90) return 'var(--accent-cyan)';
        if (pct >= 80) return 'var(--accent-blue)';
        if (pct >= 60) return '#FF7B54';
        return '#FF5252';
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Workload Distribution</h3>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Annual PKB vs target capacity (3,840/yr)</p>
                </div>
                <div style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--text-muted)' }}>LOAD</div>
            </div>

            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 8, height: 8, background: 'var(--accent-cyan)', display: 'inline-block' }}></span> PKB Count</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 2, height: 8, background: '#FFB800', display: 'inline-block' }}></span> Target (3,840)</div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {displayList.map((sa, idx) => {
                    const pct = Math.min((sa.pkb / TARGET_CAPACITY) * 100, 100);
                    return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.75rem' }}>
                            <div style={{ width: '45px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {getInitials(sa.name)}
                            </div>

                            <div style={{ flex: 1, position: 'relative', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                <div style={{
                                    width: `${pct}%`,
                                    height: '100%',
                                    background: getColor(pct),
                                    borderRadius: '2px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '4px',
                                    fontSize: '0.55rem', color: '#000', fontWeight: 'bold'
                                }}>
                                    {sa.pkb.toLocaleString()}
                                </div>
                                {/* Target Marker line assuming the bar represents 0 to 100% capacity */}
                                <div style={{ position: 'absolute', top: -2, bottom: -2, left: '100%', width: '2px', background: '#FFB800' }}></div>
                            </div>

                            <div style={{ width: '25px', textAlign: 'right', color: getColor(pct), fontWeight: 500, fontSize: '0.7rem' }}>
                                {Math.round(pct)}%
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SaWorkloadDistribution;
