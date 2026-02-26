import React from 'react';

import CombinedTeamKpis from './CombinedTeamKpis';
import ScoreRings from './ScoreRings';
import TargetAchievementTable from './TargetAchievementTable';
import CoachingFlags from './CoachingFlags';

const TeamOverviewTab = ({ dataset }) => {

    const saKpis = dataset.sa_kpis || {};
    const mecKpis = dataset.mec_kpis || {};
    const saList = dataset.service_advisors || [];
    const mecList = dataset.mechanics || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top Level Macro Aggregation */}
            <CombinedTeamKpis saKpis={saKpis} mecKpis={mecKpis} />

            {/* Split view for Grades and Targets */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
                <ScoreRings saList={saList} mecList={mecList} />
                <TargetAchievementTable saKpis={saKpis} mecKpis={mecKpis} />
            </div>

            {/* Coaching actionable insights pipeline */}
            <CoachingFlags saList={saList} mecList={mecList} />

        </div>
    );
};

export default TeamOverviewTab;
