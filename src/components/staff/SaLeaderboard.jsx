import React from 'react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
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

const SaLeaderboard = ({ saList, selectedIndex, onSelect }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>SA Leaderboard</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>Click row to view detail profile — ranked by annual revenue</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid var(--panel-border)', borderRadius: '12px', color: 'var(--text-muted)' }}>RANK</div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)' }}>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500 }}>#</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500 }}>NAME</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>REVENUE</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>PKB</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>GP%</th>
                            <th style={{ padding: '0.8rem 0.5rem', fontWeight: 500, textAlign: 'center' }}>GRADE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saList.map((sa, idx) => {
                            const isSelected = selectedIndex === idx;
                            return (
                                <tr
                                    key={idx}
                                    onClick={() => onSelect(idx)}
                                    style={{
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        background: isSelected ? 'rgba(255, 184, 0, 0.05)' : 'transparent',
                                        transition: 'background 0.2s',
                                        borderLeft: isSelected ? '3px solid #FFB800' : '3px solid transparent'
                                    }}
                                    className="table-row-hover"
                                >
                                    <td style={{ padding: '0.8rem 0.5rem', color: isSelected ? '#FFB800' : 'var(--text-muted)' }}>
                                        {idx + 1}
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{
                                                width: '28px', height: '28px',
                                                borderRadius: '50%',
                                                border: `1px solid ${isSelected ? '#FFB800' : 'var(--panel-border)'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.6rem', color: isSelected ? '#FFB800' : 'var(--text-muted)'
                                            }}>
                                                {getInitials(sa.name)}
                                            </div>
                                            <span style={{ color: isSelected ? '#FFB800' : 'var(--text-main)', fontWeight: isSelected ? 600 : 400 }}>
                                                {sa.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: '#FFB800', fontWeight: 500 }}>
                                        {formatNum(sa.revenue)}
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-cyan)' }}>
                                        {sa.pkb.toLocaleString()} <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>PKB</span>
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right', color: 'var(--accent-green)' }}>
                                        {sa.gp_margin}%
                                    </td>
                                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '0.2rem 0.4rem',
                                            borderRadius: '4px',
                                            border: `1px solid ${sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                                            color: sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {sa.grade}
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

export default SaLeaderboard;
