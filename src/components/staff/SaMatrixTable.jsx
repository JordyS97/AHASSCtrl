import React from 'react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const SaMatrixTable = ({ saList }) => {
    if (!saList || saList.length === 0) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Full SA Performance Matrix</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>All KPIs per Service Advisor — Full Period</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>SORT: REVENUE ↓</button>
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-main)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem' }}>TABLE</button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500 }}>#</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500 }}>Name</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Revenue</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>PKB</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>GP</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>GP%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Avg Rev/PKB</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Discount%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Booking%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Group%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Retention</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'center' }}>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {saList.map((sa, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-muted)' }}>{idx + 1}</td>
                            <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-main)' }}>
                                {sa.name} {idx === 0 && <span style={{ color: '#FFB800' }}>★</span>}
                            </td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: '#FFB800' }}>{formatNum(sa.revenue)}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>{sa.pkb.toLocaleString()}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-green)' }}>{formatNum(sa.gp)}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>{sa.gp_margin}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{formatNum(sa.avg_rev_pkb)}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: sa.discount_pct >= 5.0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{sa.discount_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{sa.booking_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{sa.group_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{sa.retention_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.1rem 0.3rem',
                                    border: `1px solid ${sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                                    color: sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                                    borderRadius: '3px'
                                }}>
                                    {sa.grade}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style>{`
                .table-row-hover:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
            `}</style>
        </div>
    );
};

export default SaMatrixTable;
