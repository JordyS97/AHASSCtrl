import React from 'react';

const getInitials = (name) => {
    return name.split(' ')[0]; // Just return first name
};

const EfficiencyHeatmap = ({ mecList }) => {
    if (!mecList || mecList.length === 0) return null;

    // We take top 12 mechanics for a clean grid
    const displayList = mecList.slice(0, 12);

    // Find absolute max monthly throughput across ALL mechanics to scale the color
    let maxThroughput = 1;
    displayList.forEach(m => {
        m.monthly_throughput.forEach(val => {
            if (val > maxThroughput) maxThroughput = val;
        });
    });

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Mechanic Efficiency Heatmap</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Units/day × mechanic × month — darker = higher throughput</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--text-muted)' }}>HEATMAP</div>
            </div>

            <div style={{ minWidth: '700px' }}>
                {/* Header Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(12, 1fr)', gap: '4px', marginBottom: '4px' }}>
                    <div></div>
                    {monthLabels.map(m => (
                        <div key={m} style={{ textAlign: 'center', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>{m}</div>
                    ))}
                </div>

                {/* Grid Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {displayList.map((mec, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '100px repeat(12, 1fr)', gap: '4px' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                {getInitials(mec.name)}
                            </div>
                            {mec.monthly_throughput.map((val, mIdx) => {
                                // Calculate intensity (0.1 to 1.0)
                                const intensity = Math.max(0.1, val / maxThroughput);
                                return (
                                    <div
                                        key={mIdx}
                                        style={{
                                            background: `rgba(0, 255, 128, ${intensity})`,
                                            height: '28px',
                                            borderRadius: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.65rem',
                                            color: intensity > 0.5 ? '#000' : 'var(--text-muted)',
                                            fontWeight: intensity > 0.5 ? 'bold' : 'normal',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                        title={`${monthLabels[mIdx]}: ${val} units`}
                                    >
                                        {val}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                <span>Low</span>
                <div style={{ flex: 1, margin: '0 1rem', height: '4px', background: 'linear-gradient(90deg, rgba(0, 255, 128, 0.1), rgba(0, 255, 128, 1))', borderRadius: '2px', alignSelf: 'center' }}></div>
                <span>High Throughput</span>
            </div>

        </div>
    );
};

export default EfficiencyHeatmap;
