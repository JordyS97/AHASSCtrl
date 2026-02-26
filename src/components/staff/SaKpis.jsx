import React from 'react';
import { Users, FileText, DollarSign, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const SaKpis = ({ kpis }) => {
    const kpiData = [
        {
            title: "TOTAL SA",
            value: kpis.total_sa || 0,
            unit: "staff",
            sub: "Active team",
            trend: null,
            color: 'var(--text-main)',
            icon: <Users size={16} />
        },
        {
            title: "TOTAL PKB HANDLED",
            value: (kpis.total_pkb || 0).toLocaleString(),
            unit: "PKB",
            sub: "↑ +12.4%",
            trend: 'up',
            color: 'var(--accent-cyan)',
            icon: <FileText size={16} />
        },
        {
            title: "TOTAL REVENUE (SA)",
            value: formatNum(kpis.total_rev || 0),
            unit: "",
            sub: "↑ +14.2%",
            trend: 'up',
            color: '#FFB800',
            icon: <DollarSign size={16} />
        },
        {
            title: "AVG GP / SA",
            value: formatNum(kpis.avg_gp || 0),
            unit: "",
            sub: "↑ +8.7%",
            trend: 'up',
            color: 'var(--accent-green)',
            icon: <Activity size={16} />
        },
        {
            title: "AVG PKB / SA / MONTH",
            value: (kpis.avg_pkb_month || 0).toFixed(0),
            unit: "PKB",
            sub: "↑ +5.2%",
            trend: 'up',
            color: 'var(--accent-cyan)',
            icon: <TrendingUp size={16} />
        },
        {
            title: "AVG DISCOUNT GIVEN",
            value: (kpis.avg_discount || 0).toFixed(1),
            unit: "%",
            sub: "↑ +0.3pp risk",
            trend: 'down',
            color: 'var(--accent-red)',
            icon: <AlertTriangle size={16} />
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
                    borderTop: idx === 2 ? '2px solid #FFB800' : '1px solid var(--panel-border)'
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
                        {kpi.trend === 'up' && <span style={{ color: 'var(--accent-green)' }}>{kpi.sub}</span>}
                        {kpi.trend === 'down' && <span style={{ color: 'var(--accent-red)' }}>{kpi.sub}</span>}
                        {!kpi.trend && <span style={{ color: 'var(--text-muted)' }}>{kpi.sub}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SaKpis;
