import React from 'react';
import GeographyKpis from './GeographyKpis';
import GeoDensityMap from './GeoDensityMap';
import DistrictRankings from './DistrictRankings';
import DistrictReachHeatmap from './DistrictReachHeatmap';
import { useData } from '../../DataContext';

const GeographyTab = () => {
    const { datasets } = useData();
    const dataset = datasets.customerIntel;

    if (!dataset) return <div style={{ color: 'var(--accent-cyan)', padding: '2rem' }}>Mapping Geographies...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 4 KPIs */}
            <GeographyKpis data={dataset.geoKpis} kabData={dataset.geoKabupaten} />

            {/* Split Map and Rankings */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <GeoDensityMap geo={dataset.geoKabupaten} />
                <DistrictRankings geo={dataset.geoKabupaten} />
            </div>

            {/* Bottom Row */}
            <div>
                <DistrictReachHeatmap
                    hierarchy={dataset.geoHierarchy}
                    months={dataset.heatmapMonths}
                    kecData={dataset.geoKecamatan}
                />
            </div>

        </div>
    );
};

export default GeographyTab;
