import React from 'react';
import { TrendingUp, TrendingDown, Wrench, BarChart2 } from 'lucide-react';
import { useData } from '../DataContext';

const KpiCards = () => {
    const { kpis, loading } = useData();
    if (loading || !kpis) return <div className="kpi-grid"><div className="glass-panel" style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div></div>;

    const kpiData = [
        {
            title: "TOTAL REVENUE",
            value: kpis.revenue.toLocaleString(),
            unit: "Jt",
            trend: "+12.4%", // Replace with actual trend if available
            isPositive: true,
            icon: <BarChart2 size={16} className="text-cyan" />
        },
        {
            title: "GROSS PROFIT",
            value: kpis.gp.toLocaleString(),
            unit: "Jt",
            trend: "+8.7%", // Replace with actual trend if available
            isPositive: true,
            icon: <TrendingUp size={16} className="text-purple" />
        },
        {
            title: "UNIT ENTRY (PKB)",
            value: kpis.units.toLocaleString(),
            unit: "unit",
            trend: "+5.2%",
            isPositive: true,
            icon: <Wrench size={16} className="text-muted" />
        },
        {
            title: "GP MARGIN",
            value: Math.floor(kpis.margin),
            unit: `.${(kpis.margin % 1 * 10).toFixed(0)}%`,
            trend: "-1.2%",
            isPositive: false,
            icon: <TrendingDown size={16} className="text-orange" />
        }
    ];

    return (
        <div className="kpi-grid">
            {kpiData.map((kpi, index) => (
                <div key={index} className="glass-panel">
                    <div className="panel-title text-muted" style={{ fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase' }}>
                        {kpi.title} {kpi.icon}
                    </div>
                    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                        <span className="mono-text fw-bold" style={{ fontSize: '2.5rem', lineHeight: '1' }}>{kpi.value}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{kpi.unit}</span>
                    </div>
                    <div style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: kpi.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(249, 115, 22, 0.1)', color: kpi.isPositive ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
                        {kpi.isPositive ? '↑' : '↓'} {kpi.trend}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KpiCards;
