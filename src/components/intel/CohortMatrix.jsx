import React from 'react';

const CohortMatrix = ({ cohorts }) => {
    if (!cohorts) return null;

    const getIntensityColor = (pct) => {
        if (!pct) return 'rgba(255,255,255,0.02)';
        if (pct >= 60) return 'rgba(0, 242, 254, 1)';
        if (pct >= 50) return 'rgba(0, 242, 254, 0.8)';
        if (pct >= 45) return 'rgba(0, 242, 254, 0.6)';
        if (pct >= 40) return 'rgba(0, 242, 254, 0.4)';
        if (pct >= 30) return 'rgba(255, 165, 0, 0.3)';
        if (pct >= 20) return 'rgba(255, 80, 80, 0.3)';
        return 'rgba(255, 80, 80, 0.5)';
    };

    // Get cohort keys sorted (they are like M202501, M202502, etc.)
    const cohortKeys = Object.keys(cohorts).sort();
    // Show at most the first 6 cohorts for display
    const displayKeys = cohortKeys.slice(0, 6);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Monthly Cohort Retention</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>% of cohort still returning by month after first visit</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>COHORT</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: 1 }}>
                        <th style={{ padding: '0 0.5rem 0.5rem 0', textAlign: 'left', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>COHORT</th>
                        <th style={{ padding: '0 0.5rem 0.5rem 0', textAlign: 'left', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>SIZE</th>
                        {[...Array(11)].map((_, i) => (
                            <th key={i} style={{ padding: '0 0 0.5rem 0', textAlign: 'center', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)', width: '38px' }}>M+{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayKeys.map((key) => {
                        const mData = cohorts[key] || {};
                        const size = mData.size || 0;
                        const label = mData.label || key;
                        if (size === 0) return null;

                        return (
                            <tr key={key}>
                                <td style={{ padding: '0.6rem 0.5rem 0.6rem 0', color: 'var(--text-muted)' }}>
                                    <div style={{ fontWeight: 600, color: '#ececec' }}>{label}</div>
                                    <div style={{ fontSize: '0.65rem' }}>{size.toLocaleString()} cust</div>
                                </td>
                                <td style={{ padding: '0.6rem 0.5rem 0.6rem 0' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem', borderRadius: '4px', textAlign: 'center', color: '#fff' }}>100%</div>
                                </td>
                                {[...Array(11)].map((_, i) => {
                                    const pct = mData[`M+${i + 1}`];
                                    const hasData = pct !== undefined;
                                    return (
                                        <td key={i} style={{ padding: '0.1rem' }}>
                                            <div style={{
                                                background: getIntensityColor(pct),
                                                color: hasData && pct > 45 ? '#000' : '#fff',
                                                padding: '0.4rem 0.2rem',
                                                borderRadius: '2px',
                                                textAlign: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                opacity: hasData ? 1 : 0.05
                                            }}>
                                                {hasData ? `${pct}%` : '-'}
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CohortMatrix;
