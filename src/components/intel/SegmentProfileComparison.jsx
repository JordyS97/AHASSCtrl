import React from 'react';

const SegmentProfileComparison = ({ behavior }) => {
    // We will use behavior stats + mock stats if missing, to mirror the mockup behavior profile
    const group = behavior?.Group || { walkinRate: 31, bookingRate: 69 };
    const reg = behavior?.Regular || { walkinRate: 64, bookingRate: 36 };

    const metrics = [
        { label: 'Avg Revenue / Visit', gVal: '851K', rVal: '565K', gPct: 85, rPct: 56, type: 'currency' },
        { label: 'GP Margin', gVal: '41.2%', rVal: '33.8%', gPct: 80, rPct: 45, type: 'pct' },
        { label: 'Visits / Year', gVal: '6.2', rVal: '2.8', gPct: 90, rPct: 35, type: 'num' },
        { label: 'Avg Discount %', gVal: '7.2%', rVal: '3.8%', gPct: 70, rPct: 35, type: 'orange' },
        { label: 'Promo Response Rate', gVal: '28%', rVal: '52%', gPct: 35, rPct: 80, type: 'pct' }
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Segment Profile<br />Comparison</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Group vs Regular -<br />behavior metrics</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>COMPARE</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

                {/* Header Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Group</span>
                    <span>Regular</span>
                </div>

                {metrics.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                            <div style={{ display: 'flex', gap: '0.5rem', fontWeight: 600 }}>
                                <span style={{ color: m.type === 'orange' ? 'var(--accent-orange)' : 'var(--accent-purple)' }}>{m.gVal}</span>
                                <span style={{ color: 'var(--text-muted)' }}>vs</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{m.rVal}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', height: '6px' }}>
                            {/* Group Bar (Left) */}
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', top: 0, bottom: 0, left: 0,
                                    width: `${m.gPct}%`,
                                    background: m.type === 'orange' ? 'var(--accent-orange)' : 'var(--accent-purple)',
                                    borderRadius: '3px'
                                }}></div>
                            </div>
                            {/* Regular Bar (Right) */}
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', top: 0, bottom: 0, left: 0,
                                    width: `${m.rPct}%`,
                                    background: m.type === 'orange' ? 'var(--accent-orange)' : 'var(--accent-cyan)',
                                    borderRadius: '3px'
                                }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SegmentProfileComparison;
