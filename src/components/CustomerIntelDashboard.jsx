import React, { useState } from 'react';

// Sub-Tabs
import SegmentTab from './intel/SegmentTab';
import RetentionTab from './intel/RetentionTab';
import GeographyTab from './intel/GeographyTab';

const CustomerIntelDashboard = () => {
    const [activeTab, setActiveTab] = useState('SEGMENT');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Top Level Sub-Navigation Hub */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex' }}>
                {['SEGMENT', 'RETENTION', 'GEOGRAPHY'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            background: activeTab === tab ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                            color: activeTab === tab ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                            padding: '1.2rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            letterSpacing: '1px',
                            transition: '0.3s'
                        }}
                    >
                        {tab === 'SEGMENT' && '◈ '}
                        {tab === 'RETENTION' && '↻ '}
                        {tab === 'GEOGRAPHY' && '◎ '}
                        {tab}
                    </button>
                ))}
            </div>

            {/* Inner Content Rendering */}
            <div style={{ marginTop: '0.5rem' }}>
                {activeTab === 'SEGMENT' && <SegmentTab />}
                {activeTab === 'RETENTION' && <RetentionTab />}
                {activeTab === 'GEOGRAPHY' && <GeographyTab />}
            </div>

        </div>
    );
};

export default CustomerIntelDashboard;
