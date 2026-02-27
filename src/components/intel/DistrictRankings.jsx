import React from 'react';

const DistrictRankings = ({ geo }) => {
    const data = (geo || []).slice(0, 10);

    const formatRevenue = (val) => {
        if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
        if (val >= 1e6) return `${(val / 1e6).toFixed(0)}M`;
        return `${Math.round(val / 1e3)}K`;
    };

    // Determine highlight: item with highest Group % (emerging B2B opportunity)
    const maxGrpPctIdx = data.reduce((maxIdx, item, idx, arr) =>
        item.grpPct > (arr[maxIdx]?.grpPct || 0) ? idx : maxIdx, 0);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>District Rankings</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Revenue, customers & segment per Kab</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>RANK</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', textAlign: 'left', letterSpacing: 1 }}>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400 }}>#</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400 }}>KABUPATEN</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'right' }}>CUST</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'right' }}>REVENUE</th>
                        <th style={{ paddingBottom: '0.8rem', fontWeight: 400, textAlign: 'center' }}>MIX</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => {
                        const isHighlight = idx === maxGrpPctIdx && row.grpPct > 40;
                        const revColor = idx < 3 ? 'var(--accent-cyan)' : isHighlight ? 'var(--accent-orange)' : 'var(--text-muted)';
                        return (
                            <tr key={row.kabupaten} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s', cursor: 'default' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '0.8rem 0', color: isHighlight ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                                    {String(idx + 1).padStart(2, '0')}{isHighlight && '★'}
                                </td>
                                <td style={{ padding: '0.8rem 0', color: '#ececec' }}>{row.kabupaten}</td>
                                <td style={{ padding: '0.8rem 0', textAlign: 'right', color: 'var(--text-muted)' }}>{row.cust.toLocaleString()}</td>
                                <td style={{ padding: '0.8rem 0', textAlign: 'right', color: revColor, fontWeight: 600 }}>{formatRevenue(row.revenue)}</td>
                                <td style={{ padding: '0.8rem 0', textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', width: '40px', height: '6px', overflow: 'hidden', borderRadius: '3px' }}>
                                        <div style={{ width: `${row.grpPct}%`, background: 'var(--accent-purple)' }}></div>
                                        <div style={{ width: `${row.regPct}%`, background: 'var(--accent-cyan)' }}></div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DistrictRankings;
