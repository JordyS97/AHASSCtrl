import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { useData } from '../DataContext';

const RevenueWidgets = ({ dataset, selectedCM }) => {

    const formatB = (val) => `${(Math.abs(val) / 1000000000).toFixed(2)}B`;

    // 1. Calculate Full-Year Waterfall from the selected dataset
    const waterfallData = useMemo(() => {
        let rev = 0, gp = 0, discount = 0, faktur = 0, ppn = 0;
        Object.values(dataset).forEach(month => {
            const r = month?.Regular || {};
            const g = month?.Group || {};
            rev += (r.revenue || 0) + (g.revenue || 0);
            gp += (r.gp || 0) + (g.gp || 0);
            discount += Math.abs(r.discount || 0) + Math.abs(g.discount || 0);
        });

        const grossSales = rev + discount; // theoretical
        const tax = rev * 0.11; // approximating 11% PPN if not clearly stripped in the subset payload
        const dpp = rev;
        const cogs = rev - gp;

        return [
            { name: 'Gross Sales', value: grossSales, fill: 'var(--accent-cyan)' },
            { name: 'Discount', value: -discount, fill: 'var(--accent-orange)' },
            { name: 'Total Faktur', value: grossSales - discount, fill: 'var(--accent-cyan)' },
            { name: 'Tax (11%)', value: -tax, fill: 'var(--accent-orange)' },
            { name: 'DPP', value: dpp, fill: 'var(--accent-cyan)' },
            { name: 'COGS', value: -cogs, fill: 'var(--accent-purple)' },
            { name: 'GP', value: gp, fill: 'var(--accent-green)' },
        ];
    }, [dataset]);

    // 2. Service Mix GP
    // We extracted this globally in Python, so it doesn't strictly adhere to the CM filter unless we drill down.
    // For now, using the global extract to match the UI mock.
    const { datasets } = useData();
    const revenueDataRaw = datasets.revenue;
    const serviceMix = revenueDataRaw?.serviceMixGP || [];
    const PIE_COLORS = ['#00f2fe', '#f59e0b', '#a855f7', '#ec4899', '#10b981'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Waterfall Chart */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '350px' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3 className="panel-title">Full-Year Revenue Flow</h3>
                        <p className="panel-subtitle">Sales → DPP → GP · Annual</p>
                    </div>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={waterfallData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                formatter={(v) => formatB(v)}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                                {waterfallData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sub Grid for Donut and Payment */}
            <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: '300px' }}>

                {/* GP By Service Type Donut */}
                <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3 className="panel-title">GP by Service Type</h3>
                        <p className="panel-subtitle">Jenis · GP split</p>
                    </div>
                    <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={serviceMix}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {serviceMix.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                    formatter={(value) => formatB(value)}
                                />
                                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>GP</div>
                        </div>
                    </div>
                </div>

                {/* Simulated Payment Methods */}
                <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3 className="panel-title">Payment Method</h3>
                            <p className="panel-subtitle">Metode Pembayaran · %</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span>Cash / Tunai</span><span>38%</span></div>
                            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px' }}>
                                <div style={{ width: '38%', backgroundColor: 'var(--accent-cyan)', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span>Transfer Bank</span><span>29%</span></div>
                            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px' }}>
                                <div style={{ width: '29%', backgroundColor: 'var(--accent-green)', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span>Credit Card</span><span>18%</span></div>
                            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px' }}>
                                <div style={{ width: '18%', backgroundColor: 'var(--accent-purple)', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span>Invoice / B2B</span><span>11%</span></div>
                            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px' }}>
                                <div style={{ width: '11%', backgroundColor: 'var(--accent-orange)', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RevenueWidgets;
