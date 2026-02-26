import React from 'react';

import CollaborationMatrix from './CollaborationMatrix';
import TopPairs from './TopPairs';
import PairsScatterPlot from './PairsScatterPlot';

const SaMechanicMatrixTab = ({ dataset }) => {
    // We extracted the matrix node from json
    const matrix = dataset.matrix || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top row: Scatter Plot & Top Pairs */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <PairsScatterPlot matrix={matrix} />
                <TopPairs matrix={matrix} />
            </div>

            {/* Main massive Heatmap Matrix */}
            <CollaborationMatrix matrix={matrix} saList={dataset.service_advisors} mecList={dataset.mechanics} />

        </div>
    );
};

export default SaMechanicMatrixTab;
