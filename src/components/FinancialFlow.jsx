import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../DataContext';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'var(--bg-color)',
                padding: '10px',
                border: '1px solid var(--panel-border)',
                borderRadius: '8px',
                color: 'var(--text-main)'
            }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
                <p style={{ margin: '5px 0 0 0', color: data.color }}>
                    {data.val > 0 ? '+' : ''}{data.val} Jt
                </p>
            </div>
        );
    }
    return null;
};

const FinancialFlow = () => {
    const { datasets } = useData();
    const dashboardData = datasets.dashboard;
    if (!dashboardData?.financialFlow) return <div className="glass-panel" style={{ height: '400px', color: 'var(--text-muted)', padding: '2rem' }}>Loading...</div>;
    const { financialFlow } = dashboardData;
    const { faktur, diskon, ppn, dpp, cogs, gp } = financialFlow;

    const absDiskon = Math.abs(diskon);
    const data = [
        { name: 'Total Faktur', start: 0, end: faktur, val: faktur, color: 'var(--accent-cyan)' },
        { name: 'Discount', start: faktur - absDiskon, end: faktur, val: -absDiskon, color: 'var(--accent-orange)' },
        { name: 'Tax/PPN', start: faktur - absDiskon - ppn, end: faktur - absDiskon, val: -ppn, color: 'var(--accent-orange)' },
        { name: 'DPP/Rev.', start: 0, end: dpp, val: dpp, color: 'var(--accent-cyan)' },
        { name: 'COGS', start: gp, end: dpp, val: -cogs, color: 'var(--accent-purple)' },
        { name: 'GP', start: 0, end: gp, val: gp, color: 'var(--accent-green)' },
    ];

    const maxVal = Math.max(...data.map(d => Math.max(d.start, d.end)));

    return (
        <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Financial Flow</h3>
                <p className="panel-subtitle">Total Faktur → GP Breakdown</p>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-main)', fontSize: 12, width: 80 }}
                        />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                        <Bar dataKey="end" radius={[4, 4, 4, 4]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    style={{
                                        transform: `translateX(${entry.start > 0 ? (entry.start / maxVal) * 100 : 0}%)`,
                                        width: `${(Math.abs(entry.end - entry.start) / maxVal) * 100}%`
                                    }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Details summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--panel-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span className="text-muted">Total Sales</span>
                    <span className="text-cyan fw-bold">{Math.round(faktur).toLocaleString()} Jt</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span className="text-muted">GP</span>
                    <span className="text-green fw-bold">{Math.round(gp).toLocaleString()} Jt</span>
                </div>
            </div>
        </div>
    );
};

export default FinancialFlow;
