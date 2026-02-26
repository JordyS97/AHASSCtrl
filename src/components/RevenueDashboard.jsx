import React, { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import RevenueKpis from './RevenueKpis';
import MasterTrendChart from './MasterTrendChart';
import MonthlyBreakdownTable from './MonthlyBreakdownTable';
import RevenueWidgets from './RevenueWidgets';

const RevenueDashboard = () => {
    const { datasets } = useData();
    const revenueData = datasets.revenue;
    // Top Level Global State
    const [selectedCM, setSelectedCM] = useState('All Workshops');

    if (!revenueData) return <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>Loading Revenue Data...</div>;

    const workshops = revenueData?.workshops || ['All Workshops'];
    const monthlyDataRaw = revenueData?.monthlyData || {};
    const monthOrder = revenueData?.monthOrder || [];

    // Compute the filtered dataset based on the global CM SAP filter
    // Shape: { "Jan 25": { "Regular": {rev, gp}, "Group": {rev, gp} } }
    const filteredMonthlyData = useMemo(() => {
        const workshopKey = selectedCM === 'All Workshops' ? 'All_Workshops' : selectedCM;
        return monthlyDataRaw[workshopKey] || {};
    }, [selectedCM, monthlyDataRaw]);

    // Derive available date range label from monthOrder
    const dateRangeLabel = useMemo(() => {
        if (monthOrder.length === 0) return 'All Data';
        return `${monthOrder[0]} – ${monthOrder[monthOrder.length - 1]}`;
    }, [monthOrder]);

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
                        <span style={{ color: 'var(--accent-cyan)', padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            {dateRangeLabel}
                        </span>
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
            <MasterTrendChart dataset={filteredMonthlyData} monthOrder={monthOrder} />

            <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(350px, 1.2fr) minmax(300px, 1fr) minmax(250px, 1fr)' }}>
                <MonthlyBreakdownTable dataset={filteredMonthlyData} monthOrder={monthOrder} />
                <RevenueWidgets dataset={filteredMonthlyData} selectedCM={selectedCM} />
            </div>

        </div>
    );
};

export default RevenueDashboard;
