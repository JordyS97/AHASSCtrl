import React, { useState, useEffect } from 'react';
import IntelKpis from './IntelKpis';
import SegmentProfileComparison from './SegmentProfileComparison';
import RfmMatrix from './RfmMatrix';
import FleetProfile from './FleetProfile';
import BehaviorDeepDive from './BehaviorDeepDive';
import ServicePreferenceBars from './ServicePreferenceBars';

const SegmentTab = () => {
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        fetch('/data/customer_intel_data.json')
            .then(res => res.json())
            .then(data => setDataset(data))
            .catch(err => console.error("Error loading intel data:", err));
    }, []);

    if (!dataset) return <div style={{ color: 'var(--accent-cyan)', padding: '2rem' }}>Crunching ~1 Million Rows... Loading Intel...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 6 KPIs Row */}
            <IntelKpis data={dataset.kpis} />

            {/* Middle Row: Comparison & RFM & Fleet */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1.2fr 1fr' }}>
                <SegmentProfileComparison behavior={dataset.behavior} />
                <RfmMatrix rfmData={dataset.rfm_matrix} />
                <FleetProfile fleet={dataset.fleet} />
            </div>

            {/* Bottom Row: Behavior Table & Preferences */}
            <div className="charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <BehaviorDeepDive behavior={dataset.behavior} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ServicePreferenceBars />
                    {/* Insights Block Placeholder */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            ⚑ Segment Insights
                        </h3>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '4px solid var(--accent-orange)' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>GROUP CUSTOMERS = 6.2× more visits</p>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Assign dedicated SAs to each Group account to maximize retention and upsell.</p>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '4px solid var(--accent-cyan)', marginTop: '0.8rem' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>REGULAR = High promo sensitivity</p>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>52% came via promo. High acquisition, but retention at risk — 42% one-visit only.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SegmentTab;
