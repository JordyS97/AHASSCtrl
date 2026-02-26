import React from 'react';
import { Users, PenTool, TrendingUp, Clock, RefreshCcw, CheckCircle } from 'lucide-react';

const formatNum = (num) => {
    return num.toLocaleString();
};

const MechanicKpis = ({ kpis }) => {
    const kpiData = [
        {
            title: "TOTAL MECHANICS",
            value: kpis.total_mec || 0,
            unit: "staff",
            sub: "Active team",
            trend: null,
            color: 'var(--text-main)',
            icon: <Users size={16} />
        },
        {
            title: "TOTAL UNITS HANDLED",
            value: formatNum(kpis.total_units || 0),
            unit: "unit",
            sub: "↑ +12.4%",
            trend: 'up',
            color: 'var(--accent-cyan)',
            icon: <PenTool size={16} />
        },
        {
            title: "AVG UNITS / MEC / DAY",
            value: (kpis.avg_units_day || 0).toFixed(1),
            unit: "unit",
            sub: "↑ +0.4 units",
            trend: 'up',
            color: '#FFB800',
            icon: <TrendingUp size={16} />
        },
        {
            title: "AVG SERVICE TIME",
            value: (kpis.avg_time || 0).toFixed(0),
            unit: "min",
            sub: "↓ -3min faster",
            trend: 'up', // Arrow down but green (faster is better)
            trendOverrideColor: 'var(--accent-green)',
            color: '#FFB800',
            icon: <Clock size={16} />
        },
        {
            title: "REWORK RATE",
            value: (kpis.avg_rework_rate || 0).toFixed(1),
            unit: "%",
            sub: "↓ improved",
            trend: 'up',
            trendOverrideColor: 'var(--accent-green)',
            color: 'var(--accent-red)',
            icon: <RefreshCcw size={16} />
        },
        {
            title: "FIRST-PASS QUALITY",
            value: (kpis.avg_quality || 0).toFixed(1),
            unit: "%",
            sub: "↑ +0.8pp",
            trend: 'up',
            color: 'var(--accent-green)',
            icon: <CheckCircle size={16} />
        }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {kpiData.map((kpi, idx) => (
                <div key={idx} className="glass-panel" style={{
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    borderTop: `2px solid ${kpi.color}`
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{kpi.title}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                            {kpi.value}
                        </span>
                        {kpi.unit && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{kpi.unit}</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        {kpi.trend === 'up' && <span style={{ color: kpi.trendOverrideColor || 'var(--accent-green)' }}>{kpi.sub}</span>}
                        {kpi.trend === 'down' && <span style={{ color: kpi.trendOverrideColor || 'var(--accent-red)' }}>{kpi.sub}</span>}
                        {!kpi.trend && <span style={{ color: 'var(--text-muted)' }}>{kpi.sub}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MechanicKpis;
