import React from 'react';

const formatNum = (num) => {
    return num.toLocaleString();
};

const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const MechanicLeaderboard = ({ mecList, selectedIndex, onSelect }) => {
    if (!mecList || mecList.length === 0) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Mechanic Leaderboard</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>Click row to view detail profile — ranked by efficiency & quality</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid var(--panel-border)', borderRadius: '12px', color: 'var(--text-muted)' }}>RANK</div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)' }}>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500 }}>#</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500 }}>NAME</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>UNITS</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>AVG TIME</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>QUALITY%</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'center' }}>GRADE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mecList.slice(0, 12).map((mec, idx) => {
                            const isSelected = selectedIndex === idx;
                            return (
                                <tr
                                    key={idx}
                                    onClick={() => onSelect(idx)}
                                    style={{
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        background: isSelected ? 'rgba(0, 242, 254, 0.05)' : 'transparent',
                                        transition: 'background 0.2s',
                                        borderLeft: isSelected ? '3px solid var(--accent-green)' : '3px solid transparent'
                                    }}
                                    className="table-row-hover"
                                >
                                    <td style={{ padding: '0.8rem 0.5rem', color: isSelected ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                                        {idx + 1}
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{
                                                width: '28px', height: '28px',
                                                borderRadius: '50%',
                                                border: `1px solid ${isSelected ? 'var(--accent-green)' : 'var(--panel-border)'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.6rem', color: isSelected ? 'var(--accent-green)' : 'var(--text-muted)'
                                            }}>
                                                {getInitials(mec.name)}
                                            </div>
                                            <span style={{ color: isSelected ? 'var(--accent-green)' : 'var(--text-main)', fontWeight: isSelected ? 600 : 400 }}>
                                                {mec.name.split(' ')[0]} {mec.name.split(' ')[1] || ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-green)', fontWeight: 500 }}>
                                        {formatNum(mec.units)} <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 400 }}>unit</span>
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>
                                        {mec.avg_time}<span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>min</span>
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: '#FFB800' }}>
                                        {mec.quality_pct}%
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '0.2rem 0.4rem',
                                            borderRadius: '4px',
                                            border: `1px solid ${mec.grade.includes('A') ? '#FFB800' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                                            color: mec.grade.includes('A') ? '#FFB800' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {mec.grade}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <style>{`
                .table-row-hover:hover {
                    background: rgba(255, 255, 255, 0.02) !important;
                }
            `}</style>
        </div>
    );
};

export default MechanicLeaderboard;
