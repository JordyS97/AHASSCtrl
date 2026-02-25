import React, { useState, useEffect } from 'react';
import GeographyKpis from './GeographyKpis';
import GeoDensityMap from './GeoDensityMap';
import DistrictRankings from './DistrictRankings';
import DistrictReachHeatmap from './DistrictReachHeatmap';
import DistanceDonut from './DistanceDonut';

const GeographyTab = () => {
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        fetch('/data/customer_intel_data.json')
            .then(res => res.json())
            .then(data => setDataset(data))
            .catch(err => console.error("Error loading geo data:", err));
    }, []);

    if (!dataset) return <div style={{ color: 'var(--accent-cyan)', padding: '2rem' }}>Mapping Geographies...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 4 KPIs */}
            <GeographyKpis data={dataset.geography} />

            {/* Split Map and Rankings */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <GeoDensityMap geo={dataset.geography} />
                <DistrictRankings geo={dataset.geography} />
            </div>

            {/* Bottom Row */}
            <div className="charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <DistrictReachHeatmap />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <DistanceDonut />

                    {/* Geo Opportunities Block Mockup */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            📍 Geo Opportunities
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(255, 165, 0, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-orange)' }}>
                                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--accent-orange)' }}>🚀 KARAWANG: +68% YoY growth</p>
                                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Group customers driving — consider mobile service unit or satellite point.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(0, 242, 254, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-cyan)' }}>
                                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--accent-cyan)' }}>🎯 41% customers within 5 km</p>
                                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Hyper-local WhatsApp blast effective. Target: walk-in promo days.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(170, 80, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-purple)' }}>
                                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--accent-purple)' }}>🏢 Group concentrated in Kota Bandung</p>
                                <p className="text-muted" style={{ fontSize: '0.75rem' }}>52% Group accounts in Kota Bandung. B2B outreach focus here for 2025.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default GeographyTab;
