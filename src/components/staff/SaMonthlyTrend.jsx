import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const SaMonthlyTrend = ({ sa }) => {
    if (!sa || !sa.monthly_pkb) {
        return <div className="glass-panel" style={{ padding: '1.5rem', height: '280px' }}>Loading Trend...</div>;
    }

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = sa.monthly_pkb.map((val, idx) => ({
        name: monthLabels[idx],
        PKB: val
    }));

    // Find max value to highlight the peak month in gold
    const maxVal = Math.max(...sa.monthly_pkb);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Monthly PKB Trend</h3>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Selected SA — units handled per month</p>
                </div>
                <div style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>TREND</div>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--text-muted)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '12px' }}
                            itemStyle={{ color: 'var(--accent-cyan)' }}
                        />
                        <Bar dataKey="PKB" radius={[2, 2, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.PKB === maxVal ? '#FFB800' : 'rgba(0, 242, 254, 0.5)'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SaMonthlyTrend;
