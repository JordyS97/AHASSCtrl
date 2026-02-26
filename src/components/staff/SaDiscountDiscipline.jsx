import React from 'react';

const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
        return parts[0] + ' ' + parts[1][0] + '.';
    }
    return parts[0];
};

const SaDiscountDiscipline = ({ saList }) => {
    if (!saList || saList.length === 0) return null;

    // Need to sort SAs specifically for this chart: lowest discount (best) at top
    const sortedList = [...saList].sort((a, b) => a.discount_pct - b.discount_pct).slice(0, 8);

    // Max scale, lets say worst is 10%
    const MAX_SCALE = 10;

    const getColor = (pct) => {
        if (pct < 4.0) return 'var(--accent-green)';
        if (pct < 5.5) return '#FFB800'; // Warning
        return 'var(--accent-red)'; // Danger
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Discount Discipline</h3>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Avg discount % per SA — lower is better for GP</p>
                </div>
                <div style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--text-muted)' }}>DISCOUNT</div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.5rem' }}>
                {sortedList.map((sa, idx) => {
                    const widthPct = Math.min((sa.discount_pct / MAX_SCALE) * 100, 100);
                    const isGood = sa.discount_pct < 4.0;
                    const isBad = sa.discount_pct >= 5.5;

                    return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
                            <div style={{ width: '50px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {getInitials(sa.name)}
                            </div>

                            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                <div style={{
                                    width: `${widthPct}%`,
                                    height: '100%',
                                    background: getColor(sa.discount_pct),
                                    borderRadius: '4px'
                                }}></div>
                            </div>

                            <div style={{ width: '30px', textAlign: 'right', color: getColor(sa.discount_pct), fontWeight: 'bold' }}>
                                {sa.discount_pct.toFixed(1)}%
                            </div>
                            <div style={{ width: '15px', textAlign: 'center', color: isBad ? 'var(--accent-red)' : isGood ? 'var(--accent-green)' : '#FFB800', fontSize: '0.8rem' }}>
                                {isBad ? '!' : isGood ? '✓' : '~'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SaDiscountDiscipline;
