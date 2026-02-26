import React from 'react';
import { useData } from '../DataContext';

const MotorcycleProfile = () => {
    const { datasets } = useData();
    const advancedData = datasets.advanced;
    const defaultProfile = { top_models: {}, avg_km: 0, avg_year: 0 };
    const regProfile = advancedData?.motorProfile?.Regular || defaultProfile;
    const grpProfile = advancedData?.motorProfile?.Group || defaultProfile;

    const renderList = (models, color) => {
        const entries = Object.entries(models).sort((a, b) => b[1] - a[1]);
        const max = entries.length > 0 ? entries[0][1] : 1;

        return entries.map(([model, count], idx) => (
            <div key={idx} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>{model}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{count}</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px' }}>
                    <div style={{ width: `${(count / max) * 100}%`, backgroundColor: color, height: '100%', borderRadius: '4px' }}></div>
                </div>
            </div>
        ));
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 className="panel-title">Asset Profile by Segment</h3>
                <p className="panel-subtitle">Top Motorcycle Models & Demographics</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: '1 1 250px' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(0, 242, 254, 0.2)', paddingBottom: '0.5rem' }}>
                        Regular Customers
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Usage (KM)</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{regProfile.avg_km.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Year</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{regProfile.avg_year || 'N/A'}</div>
                        </div>
                    </div>
                    <div>
                        {renderList(regProfile.top_models, 'var(--accent-cyan)')}
                    </div>
                </div>

                <div style={{ flex: '1 1 250px' }}>
                    <h4 style={{ color: 'var(--accent-purple)', marginBottom: '1rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(168, 85, 247, 0.2)', paddingBottom: '0.5rem' }}>
                        Group / Fleet Customers
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Usage (KM)</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{grpProfile.avg_km.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Year</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{grpProfile.avg_year || 'N/A'}</div>
                        </div>
                    </div>
                    <div>
                        {renderList(grpProfile.top_models, 'var(--accent-purple)')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotorcycleProfile;
