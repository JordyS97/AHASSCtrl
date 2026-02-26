import React from 'react';

const formatNum = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const TopPairs = ({ matrix }) => {
    if (!matrix || matrix.length === 0) return null;

    // Sort by revenue descending
    const sorted = [...matrix].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Top Synergistic Pairs</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>Ranked by total combined generated revenue</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>TOP 5</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', mt: '0.5rem', flex: 1, overflowY: 'auto' }}>
                {sorted.map((pair, idx) => (
                    <div key={idx} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.8rem',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '6px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ position: 'relative', width: '40px', height: '30px' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#FFB800', border: '2px solid var(--panel-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 'bold', color: '#000', zIndex: 2 }}>
                                    {getInitials(pair.sa)}
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-cyan)', border: '2px solid var(--panel-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 'bold', color: '#000', zIndex: 1 }}>
                                    {getInitials(pair.mechanic)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                    {pair.sa.split(' ')[0]} <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>×</span> {pair.mechanic.split(' ')[0]}
                                </div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--accent-green)' }}>{pair.quality}% Quality</div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.85rem', color: '#FFB800', fontWeight: 'bold' }}>{formatNum(pair.revenue)}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{pair.pkb} PKB</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPairs;
