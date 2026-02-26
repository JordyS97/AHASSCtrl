import React, { useState } from 'react';

// Sub-Tab Components
import SaTab from './staff/SaTab';
import MechanicTab from './staff/MechanicTab';
import SaMechanicMatrixTab from './staff/SaMechanicMatrixTab';
import TeamOverviewTab from './staff/TeamOverviewTab';
import { useData } from '../DataContext';

const StaffPerformanceDashboard = () => {
    const [activeTab, setActiveTab] = useState('SERVICE ADVISOR');
    const [selectedCM, setSelectedCM] = useState('All Workshops');
    const [selectedDate, setSelectedDate] = useState('Jan-Dec 2024');
    const { datasets } = useData();
    const dataset = datasets.staffPerformance;

    if (!dataset) {
        return <div style={{ color: 'var(--accent-orange)', padding: '2rem' }}>Loading Staff Telemetry...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Header Section with Global Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', letterSpacing: '1px', fontWeight: 800, textTransform: 'uppercase' }}>
                        Expert Staff <span style={{ color: '#FFB800' }}>Performance</span>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        SA · Mechanic · Quality · Throughput · Collaboration Matrix
                    </p>
                </div>

                {/* Global Filters */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '0.5rem' }}>Date:</span>
                        <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.3)', color: '#FFB800', border: '1px solid rgba(255, 184, 0, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', outline: 'none' }}
                        >
                            <option value="Jan-Dec 2024">Jan-Dec 2024</option>
                        </select>
                    </div>

                    <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '0.5rem' }}>Workshop:</span>
                        <select
                            value={selectedCM}
                            onChange={(e) => setSelectedCM(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', border: '1px solid var(--panel-border)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', outline: 'none' }}
                        >
                            <option value="All Workshops">All Workshops</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Top Level Sub-Navigation Hub */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex' }}>
                {['SERVICE ADVISOR', 'MECHANIC', 'SA × MECHANIC MATRIX', 'TEAM OVERVIEW'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            background: activeTab === tab ? 'rgba(255, 184, 0, 0.1)' : 'transparent',
                            color: activeTab === tab ? '#FFB800' : 'var(--text-muted)',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid #FFB800' : '2px solid transparent',
                            padding: '1.2rem',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            transition: '0.3s'
                        }}
                    >
                        {tab === 'SERVICE ADVISOR' && '◈ '}
                        {tab === 'MECHANIC' && '⚙ '}
                        {tab === 'SA × MECHANIC MATRIX' && '⇄ '}
                        {tab === 'TEAM OVERVIEW' && '▣ '}
                        {tab}
                    </button>
                ))}
            </div>

            {/* Inner Content Rendering */}
            <div style={{ marginTop: '0.5rem' }}>
                {activeTab === 'SERVICE ADVISOR' && <SaTab dataset={dataset} />}
                {activeTab === 'MECHANIC' && <MechanicTab dataset={dataset} />}
                {activeTab === 'SA × MECHANIC MATRIX' && <SaMechanicMatrixTab dataset={dataset} />}
                {activeTab === 'TEAM OVERVIEW' && <TeamOverviewTab dataset={dataset} />}
            </div>

        </div>
    );
};

export default StaffPerformanceDashboard;
