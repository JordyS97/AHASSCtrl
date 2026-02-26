import React from 'react';
import RetentionKpis from './RetentionKpis';
import CustomerLifecycleBar from './CustomerLifecycleBar';
import CohortMatrix from './CohortMatrix';
import VisitFrequencyFunnel from './VisitFrequencyFunnel';
import RetentionPlaybook from './RetentionPlaybook';
import { useData } from '../../DataContext';

const RetentionTab = () => {
    const { datasets } = useData();
    const dataset = datasets.customerIntel;

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
                    <VisitFrequencyFunnel visitFrequency={dataset.visitFrequency} />
                    <RetentionPlaybook />
                </div>
            </div>

        </div>
    );
};

export default RetentionTab;
