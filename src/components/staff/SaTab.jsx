import React, { useState } from 'react';

// Sub-components
import SaKpis from './SaKpis';
import SaLeaderboard from './SaLeaderboard';
import SaDetailPanel from './SaDetailPanel';
import SaMonthlyTrend from './SaMonthlyTrend';
import SaWorkloadDistribution from './SaWorkloadDistribution';
import SaDiscountDiscipline from './SaDiscountDiscipline';
import SaMatrixTable from './SaMatrixTable';

const SaTab = ({ dataset }) => {
    // Top KPIs
    const kpis = dataset.sa_kpis || {};
    // Active SA list
    const saList = dataset.service_advisors || [];

    // Local State to track selected SA from the Leaderboard
    // Default to the first SA if exists
    const [selectedSaIndex, setSelectedSaIndex] = useState(0);

    const selectedSa = saList[selectedSaIndex] || null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 6 Macro Cards */}
            <SaKpis kpis={kpis} />

            {/* Middle Split: Leaderboard & Profile */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                <SaLeaderboard
                    saList={saList}
                    selectedIndex={selectedSaIndex}
                    onSelect={setSelectedSaIndex}
                />
                <SaDetailPanel sa={selectedSa} />
            </div>

            {/* Lower Analytics Row */}
            <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr) minmax(300px, 1fr)' }}>
                <SaMonthlyTrend sa={selectedSa} />
                <SaWorkloadDistribution saList={saList} />
                <SaDiscountDiscipline saList={saList} />
            </div>

            {/* Footer Comprehensive Matrix */}
            <SaMatrixTable saList={saList} />

        </div>
    );
};

export default SaTab;
