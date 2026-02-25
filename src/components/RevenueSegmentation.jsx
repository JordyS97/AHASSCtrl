import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import advancedData from '../advanced_dashboard_data.json';

const RevenueSegmentation = () => {
    // Graceful fallback while JSON is rendering/missing
    const segData = advancedData?.segmentation || [];

    // Transform for Donut
    const donutData = segData.map(d => ({ name: d.class, value: d.revenue }));
    const COLORS = ['var(--accent-cyan)', 'var(--accent-purple)'];

    // Transform for Stacked Bar (assuming trends data is available)
    const trendData = advancedData?.trends || [];

    const groupData = segData.find(d => d.class === 'Group') || { avg_trx: 0, revenue: 0, gp: 0 };
    const regData = segData.find(d => d.class === 'Regular') || { avg_trx: 0, revenue: 0, gp: 0 };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="charts-grid">
                <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3 className="panel-title">Revenue Share by Class</h3>
                        <p className="panel-subtitle">Donut Chart — Group vs Regular</p>
                    </div>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {donutData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                    formatter={(value) => `${value.toLocaleString()} Jt`}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3 className="panel-title">Avg Transaction Value</h3>
                        <p className="panel-subtitle">KPI Cards — Group vs Regular</p>
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '8px' }}>
                            <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Regular Class</div>
                            <div className="mono-text fw-bold" style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>{regData.avg_trx.toLocaleString()}k</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rev: {regData.revenue} Jt | GP: {regData.gp} Jt</div>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px' }}>
                            <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Group / Corp Class</div>
                            <div className="mono-text fw-bold" style={{ fontSize: '2rem', color: 'var(--accent-purple)' }}>{groupData.avg_trx.toLocaleString()}k</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rev: {groupData.revenue} Jt | GP: {groupData.gp} Jt</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <h3 className="panel-title">Monthly Revenue Trend Split</h3>
                    <p className="panel-subtitle">Stacked Bar — Group vs Regular</p>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--text-main)' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Bar dataKey="Regular" stackId="a" fill="var(--accent-cyan)" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="Group" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueSegmentation;
