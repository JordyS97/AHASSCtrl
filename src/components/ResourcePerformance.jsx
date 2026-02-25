import React from 'react';

import dashboardData from '../dashboard_data.json';

const ResourcePerformance = () => {
    // Add colors to dynamic data
    const baseColors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-green)', 'var(--accent-orange)', 'var(--accent-blue)'];
    const staffData = dashboardData.ranking.map((d, i) => ({ ...d, color: baseColors[i % baseColors.length] }));

    const maxRev = Math.max(...staffData.map(d => d.revenue));

    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h3 className="panel-title">Service Advisor Ranking</h3>
                    <p className="panel-subtitle">Revenue & Units • Nama SA</p>
                </div>
                <div style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: 'fit-content' }}>
                    STAFF
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '40px 2fr 1fr 2fr', paddingBottom: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)', marginBottom: '10px', textTransform: 'uppercase' }}>
                    <span>#</span>
                    <span>Name</span>
                    <span style={{ textAlign: 'right' }}>Units</span>
                    <span style={{ textAlign: 'right' }}>Revenue</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {staffData.map((staff, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 2fr 1fr 2fr', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span className="mono-text" style={{ color: 'var(--accent-orange)' }}>{staff.id}</span>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{staff.name}</span>
                            <span className="mono-text" style={{ textAlign: 'right' }}>{staff.units}</span>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                                <span className="mono-text text-green">{staff.revenue}Jt</span>
                                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(staff.revenue / maxRev) * 100}%`, height: '100%', background: staff.color }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourcePerformance;
