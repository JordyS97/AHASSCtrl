import React from 'react';

const formatNum = (num) => {
    return num.toLocaleString();
};

const MechanicMatrixTable = ({ mecList }) => {
    if (!mecList || mecList.length === 0) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Full Mechanic Performance Matrix</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>All technical KPIs per mechanic — Full Period</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>TABLE</button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500 }}>#</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500 }}>Name</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Units</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Avg Time</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Daily Avg</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Quality%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Rework</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Complex%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Parts Acc%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Insp Pass%</th>
                        <th style={{ padding: '0.5rem 0.5rem', fontWeight: 500, textAlign: 'center' }}>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {mecList.slice(0, 15).map((mec, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                            <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-muted)' }}>{idx + 1}</td>
                            <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-main)' }}>
                                {mec.name} {idx === 0 && <span style={{ color: 'var(--accent-green)' }}>★</span>}
                            </td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-green)' }}>{formatNum(mec.units)}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>{mec.avg_time}m</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{mec.daily_avg}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: '#FFB800' }}>{mec.quality_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: mec.rework_jobs > 40 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{mec.rework_jobs}</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{mec.complex_pct}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{mec.parts_acc}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--text-muted)' }}>{mec.insp_pass}%</td>
                            <td style={{ padding: '0.8rem 0.5rem', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.1rem 0.3rem',
                                    border: `1px solid ${mec.grade.includes('A') ? '#FFB800' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                                    color: mec.grade.includes('A') ? '#FFB800' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                                    borderRadius: '3px'
                                }}>
                                    {mec.grade}
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

export default MechanicMatrixTable;
