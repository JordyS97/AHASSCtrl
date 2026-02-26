import React, { useState, useMemo } from 'react';
import revenueData from '../revenue_dashboard_data.json';
import RevenueKpis from './RevenueKpis';
import MasterTrendChart from './MasterTrendChart';
import MonthlyBreakdownTable from './MonthlyBreakdownTable';
import RevenueWidgets from './RevenueWidgets';

const RevenueDashboard = () => {
    // Top Level Global State
    const [selectedCM, setSelectedCM] = useState('All Workshops');
    const [selectedDate, setSelectedDate] = useState('Jan-Dec 2024');

    const workshops = revenueData?.workshops || ['All Workshops'];
    const monthlyDataRaw = revenueData?.monthlyData || {};

    // Compute the filtered dataset based on the global CM SAP filter
    // Shape: { "Jan": { "Regular": {rev, gp}, "Group": {rev, gp} } }
    const filteredMonthlyData = useMemo(() => {
        const workshopKey = selectedCM === 'All Workshops' ? 'All_Workshops' : selectedCM;
        return monthlyDataRaw[workshopKey] || {};
    }, [selectedCM, monthlyDataRaw]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Header Section with Global Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', letterSpacing: '1px', fontWeight: 800, textTransform: 'uppercase' }}>
                        Revenue <span className="text-cyan">Trend</span> Analysis
                    </h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Tgl Faktur · Sales · Total Faktur · DPP · GP · Diskon — Full Year View
                    </p>
                </div>

                {/* Global Filters */}
                <div style={{ display: 'flex', gap: '1rem' }}>

                    <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '0.5rem' }}>Date:</span>
                        <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', outline: 'none' }}
                        >
                            <option value="Jan-Dec 2024">Jan-Dec 2024</option>
                            <option value="Q1 2024">Q1 2024</option>
                            <option value="Q2 2024">Q2 2024</option>
                        </select>
                    </div>

                    <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '0.5rem' }}>Workshop:</span>
                        <select
                            value={selectedCM}
                            onChange={(e) => setSelectedCM(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', border: '1px solid var(--panel-border)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', outline: 'none' }}
                        >
                            {workshops.map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* Rest of the Dashboard Components injected with filtered data */}
            <RevenueKpis dataset={filteredMonthlyData} />
            <MasterTrendChart dataset={filteredMonthlyData} />

            <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(350px, 1.2fr) minmax(300px, 1fr) minmax(250px, 1fr)' }}>
                <MonthlyBreakdownTable dataset={filteredMonthlyData} />
                <RevenueWidgets dataset={filteredMonthlyData} selectedCM={selectedCM} />
            </div>

        </div>
    );
};

export default RevenueDashboard;
