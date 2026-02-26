import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const RevenueKpis = ({ dataset }) => {

    // Calculate YTD totals from the dataset map
    const kpis = useMemo(() => {
        let rev = 0, gp = 0, dpp = 0, discount = 0, groupRev = 0;

        Object.values(dataset).forEach(monthData => {
            const regRev = monthData?.Regular?.revenue || 0;
            const regGp = monthData?.Regular?.gp || 0;
            const regDis = monthData?.Regular?.discount || 0;
            const regDpp = monthData?.Regular?.dpp || 0;

            const grpRev = monthData?.Group?.revenue || 0;
            const grpGp = monthData?.Group?.gp || 0;
            const grpDis = monthData?.Group?.discount || 0;
            const grpDpp = monthData?.Group?.dpp || 0;

            rev += (regRev + grpRev);
            gp += (regGp + grpGp);
            discount += (regDis + grpDis);
            dpp += (regDpp + grpDpp);
            groupRev += grpRev;
        });

        const margin = rev > 0 ? (gp / rev) * 100 : 0;
        const groupShare = rev > 0 ? (groupRev / rev) * 100 : 0;

        return {
            revenue: (rev / 1000000000).toFixed(2), // Billions
            grossProfit: (gp / 1000000000).toFixed(2),
            dpp: (dpp / 1000000000).toFixed(2), // Excl tax
            discount: (Math.abs(discount) / 1000000).toFixed(0), // Millions
            margin: margin.toFixed(1),
            groupShare: groupShare.toFixed(1)
        };
    }, [dataset]);

    // Mock mini sparklines
    const sparkData1 = [{ v: 1 }, { v: 3 }, { v: 2 }, { v: 5 }, { v: 4 }, { v: 7 }];
    const sparkData2 = [{ v: 5 }, { v: 4 }, { v: 6 }, { v: 3 }, { v: 5 }, { v: 2 }];

    const KpiCard = ({ title, value, unit, color, increase, trendData, margin }) => (
        <div className="glass-panel" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', zIndex: 1 }}>{title}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', zIndex: 1 }}>
                {unit === 'Rp' && <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Rp</span>}
                <span className="mono-text fw-bold" style={{ fontSize: '2.2rem', color: '#fff' }}>{value}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{unit !== 'Rp' ? unit : 'B'}</span>
            </div>
            <div style={{ zIndex: 1, marginTop: '0.8rem' }}>
                <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    background: increase ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: increase ? 'var(--accent-green)' : 'var(--accent-orange)'
                }}>
                    {increase ? '↑' : '↓'} {margin} YoY
                </span>
            </div>

            {/* Background Sparkline */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', opacity: 0.3, zIndex: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
            <KpiCard title="Total Revenue" value={kpis.revenue} unit="Rp" color="var(--accent-cyan)" increase={true} margin="+14.2%" trendData={sparkData1} />
            <KpiCard title="GP" value={kpis.grossProfit} unit="Rp" color="var(--accent-green)" increase={true} margin="+9.8%" trendData={sparkData1} />
            <KpiCard title="DPP (Excl. Tax)" value={kpis.dpp} unit="Rp" color="var(--accent-cyan)" increase={true} margin="+14.2%" trendData={sparkData1} />
            <KpiCard title="Total Discount" value={kpis.discount} unit="M" color="var(--accent-orange)" increase={true} margin="+3.1%" trendData={sparkData2} />
            <KpiCard title="GP Margin" value={kpis.margin} unit="%" color="var(--accent-orange)" increase={false} margin="-1.5pp" trendData={sparkData2} />
            <KpiCard title="Group Revenue Share" value={kpis.groupShare} unit="%" color="var(--accent-purple)" increase={true} margin="+3.8pp" trendData={sparkData1} />
        </div>
    );
};

export default RevenueKpis;
