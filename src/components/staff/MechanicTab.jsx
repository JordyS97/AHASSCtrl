import React, { useState } from 'react';

// Sub-components
import MechanicKpis from './MechanicKpis';
import MechanicLeaderboard from './MechanicLeaderboard';
import MechanicDetailPanel from './MechanicDetailPanel';
import ServiceTypeMix from './ServiceTypeMix';
import EfficiencyHeatmap from './EfficiencyHeatmap';
import MechanicMatrixTable from './MechanicMatrixTable';

const MechanicTab = ({ dataset }) => {
    // Top KPIs
    const kpis = dataset.mec_kpis || {};
    // Active Mechanic list
    const mecList = dataset.mechanics || [];

    // Local State to track selected Mechanic from the Leaderboard
    const [selectedMecIndex, setSelectedMecIndex] = useState(0);

    const selectedMec = mecList[selectedMecIndex] || null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 6 Macro Cards */}
            <MechanicKpis kpis={kpis} />

            {/* Middle Split: Leaderboard & Profile & Service Mix */}
            <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(400px, 1.2fr) minmax(350px, 1fr)' }}>
                <MechanicLeaderboard
                    mecList={mecList}
                    selectedIndex={selectedMecIndex}
                    onSelect={setSelectedMecIndex}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <MechanicDetailPanel mec={selectedMec} />
                    <ServiceTypeMix mec={selectedMec} />
                </div>
            </div>

            {/* Lower Analytics Row */}
            <EfficiencyHeatmap mecList={mecList} />

            {/* Footer Comprehensive Matrix */}
            <MechanicMatrixTable mecList={mecList} />

        </div>
    );
};

export default MechanicTab;
