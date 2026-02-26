import React, { useMemo } from 'react';

const MonthlyBreakdownTable = ({ dataset, monthOrder: propMonthOrder }) => {

    const defaultMonthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthOrder = propMonthOrder || defaultMonthOrder;

    const formatM = (val) => `${(val / 1000000).toFixed(0)}M`;

    const tableData = useMemo(() => {
        let prevRev = null;
        return monthOrder.map(month => {
            const dp = dataset[month];
            if (!dp) return { month, revenue: null, gp: null, margin: null, mom: null };

            const rev = (dp.Regular?.revenue || 0) + (dp.Group?.revenue || 0);
            const gp = (dp.Regular?.gp || 0) + (dp.Group?.gp || 0);
            const margin = rev > 0 ? (gp / rev) * 100 : 0;

            let mom = null;
            if (prevRev !== null && prevRev > 0) {
                mom = ((rev - prevRev) / prevRev) * 100;
            }
            prevRev = rev; // carry over

            return {
                month,
                revenue: rev,
                gp: gp,
                margin: margin.toFixed(1),
                mom: mom
            };
        });
    }, [dataset]);

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 className="panel-title">Monthly Breakdown</h3>
                    <p className="panel-subtitle">Revenue · GP · Margin · MoM Δ</p>
                </div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--panel-border)', padding: '2px 6px', borderRadius: '4px' }}>Table</div>
            </div>

            <div style={{ overflowX: 'auto', flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 'normal' }}>Month</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 'normal', textAlign: 'right' }}>Revenue</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 'normal', textAlign: 'right' }}>GP</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 'normal', textAlign: 'right' }}>Margin</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 'normal', textAlign: 'right' }}>MoM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, i) => {
                            if (row.revenue === null || row.revenue === 0) return null; // skip empty months
                            const isPositive = row.mom >= 0;
                            return (
                                <tr key={row.month} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '0.8rem 0.5rem', color: '#fff' }}>{row.month}</td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>{formatM(row.revenue)}</td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-main)' }}>{formatM(row.gp)}</td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-main)' }}>{row.margin}%</td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                                        {row.mom !== null ? (
                                            <span style={{
                                                background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: isPositive ? 'var(--accent-green)' : 'var(--accent-orange)',
                                                padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem'
                                            }}>
                                                {isPositive ? '↑' : '↓'}{Math.abs(row.mom).toFixed(1)}%
                                            </span>
                                        ) : <span style={{ color: 'var(--text-muted)' }}>-</span>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <button className="glass-panel" style={{ marginTop: '1.5rem', padding: '0.8rem', background: 'var(--accent-cyan)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: '0.2s', width: '100%' }}>
                ↓ Export Now
            </button>
        </div>
    );
};

export default MonthlyBreakdownTable;
