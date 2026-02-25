import React from 'react';

import dashboardData from '../dashboard_data.json';

const PartsFavorites = () => {
    const partsData = dashboardData.parts.map(p => ({ ...p, isUp: true })); // default to positive trend for now
    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h3 className="panel-title">Top Parts</h3>
                    <p className="panel-subtitle">No Part • by usage qty</p>
                </div>
                <div style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: 'fit-content' }}>
                    PARTS
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {partsData.map((part, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <span className="text-muted mono-text">{part.no}</span>
                                <span style={{ fontWeight: 500 }}>{part.part}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <span className="mono-text" style={{ color: 'var(--text-main)' }}>{part.qty.toLocaleString()}</span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: part.isUp ? 'var(--accent-green)' : 'var(--accent-orange)',
                                    width: '40px',
                                    textAlign: 'right'
                                }}>
                                    {part.isUp ? '↑' : '↓'} {part.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartsFavorites;
