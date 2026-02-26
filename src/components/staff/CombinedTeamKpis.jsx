import React from 'react';
import { Users, DollarSign, PenTool, TrendingUp, Cpu, Target } from 'lucide-react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const CombinedTeamKpis = ({ saKpis, mecKpis }) => {

    // Some combined logic
    const totalStaff = (saKpis.total_sa || 0) + (mecKpis.total_mec || 0);
    const totalRev = saKpis.total_rev || 0;
    const totalPkb = saKpis.total_pkb || 0;
    const avgGp = saKpis.avg_gp || 0;
    const quality = mecKpis.avg_quality || 0;

    const cards = [
        {
            title: "TOTAL EXPERT STAFF",
            value: totalStaff,
            unit: "STAFF",
            sub: "SA & Mechanics",
            color: 'var(--text-main)',
            icon: <Users size={16} />
        },
        {
            title: "GLOBAL GP GENERATION",
            value: formatNum(avgGp * (saKpis.total_sa || 1)),
            unit: "",
            sub: "Total GP from Services",
            color: '#FFB800',
            icon: <DollarSign size={16} />
        },
        {
            title: "TEAM SERVICE REVENUE",
            value: formatNum(totalRev),
            unit: "",
            sub: "Aggregate revenue processed",
            color: 'var(--accent-green)',
            icon: <TrendingUp size={16} />
        },
        {
            title: "TOTAL VEHICLES HANDLED",
            value: totalPkb.toLocaleString(),
            unit: "UNITS",
            sub: "Volume capacity executed",
            color: 'var(--accent-cyan)',
            icon: <PenTool size={16} />
        },
        {
            title: "GLOBAL FIRST-PASS QUALITY",
            value: quality.toFixed(1),
            unit: "%",
            sub: "Fleet-wide defect free rate",
            color: '#9B51E0',
            icon: <Target size={16} />
        },
        {
            title: "EFFICIENCY INDEX",
            value: "92.4", // Proxy mock
            unit: "PTS",
            sub: "Algorithm derived meta-score",
            color: '#FF7B54',
            icon: <Cpu size={16} />
        }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {cards.map((c, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: `2px solid ${c.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{c.title}</span>
                        <div style={{ color: c.color }}>{c.icon}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{c.value}</span>
                        {c.unit && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.unit}</span>}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.sub}</div>
                </div>
            ))}
        </div>
    );
};

export default CombinedTeamKpis;
