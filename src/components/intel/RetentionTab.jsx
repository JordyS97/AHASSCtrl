import React, { useState, useEffect } from 'react';
import RetentionKpis from './RetentionKpis';
import CustomerLifecycleBar from './CustomerLifecycleBar';
import CohortMatrix from './CohortMatrix';
import VisitFrequencyFunnel from './VisitFrequencyFunnel';
import RetentionPlaybook from './RetentionPlaybook';

const RetentionTab = () => {
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        fetch('/data/customer_intel_data.json')
            .then(res => res.json())
            .then(data => setDataset(data))
            .catch(err => console.error("Error loading intel data:", err));
    }, []);

    if (!dataset) return <div style={{ color: 'var(--accent-cyan)', padding: '2rem' }}>Loading Retention Data...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top 5 KPIs */}
            <RetentionKpis data={dataset.kpis} />

            {/* Lifecycle Bar */}
            <CustomerLifecycleBar rfmData={dataset.rfm_matrix} />

            {/* Split Bottom */}
            <div className="charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <CohortMatrix cohorts={dataset.cohorts} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <VisitFrequencyFunnel rfmData={dataset.rfm_matrix} />
                    <RetentionPlaybook />
                </div>
            </div>

        </div>
    );
};

export default RetentionTab;
