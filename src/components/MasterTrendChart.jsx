import React, { useState, useMemo } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MasterTrendChart = ({ dataset }) => {
    // Local State controls
    const [segment, setSegment] = useState('All'); // All | Regular | Group
    const [metric, setMetric] = useState('revenue'); // revenue | gp | dpp | discount
    const [chartType, setChartType] = useState('Area'); // Line | Area | Bar

    // Base UI toggles mappings
    const metricsMap = { revenue: 'Revenue', gp: 'GP', dpp: 'DPP', discount: 'Discount' };
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Transform raw `{ "Jan": { "Regular": {rev...}, "Group": {rev...} } }` into array map for Recharts
    const chartData = useMemo(() => {
        return monthOrder.map(month => {
            const dataPoint = dataset[month] || { Regular: {}, Group: {} };

            let regVal = dataPoint.Regular[metric] || 0;
            let grpVal = dataPoint.Group[metric] || 0;

            // Source data stores discounts as negative — display as positive
            if (metric === 'discount') {
                regVal = Math.abs(regVal);
                grpVal = Math.abs(grpVal);
            }

            const allVal = regVal + grpVal;

            return {
                name: month,
                All: allVal,
                Regular: regVal,
                Group: grpVal
            };
        });
    }, [dataset, metric]);

    // Format Tooltip Numbers to Billions
    const formatB = (val) => `${(val / 1000000000).toFixed(2)}B`;

    const getChartColor = () => {
        if (metric === 'gp') return 'var(--accent-green)';
        if (metric === 'discount') return 'var(--accent-orange)';
        return 'var(--accent-cyan)';
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header / Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>SEGMENT</span>
                        {['All', 'Regular', 'Group'].map(s => (
                            <button key={s} onClick={() => setSegment(s)} style={{
                                background: segment === s ? 'var(--panel-border)' : 'transparent',
                                color: segment === s ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                border: `1px solid ${segment === s ? 'var(--accent-cyan)' : 'var(--panel-border)'}`,
                                padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', transition: '0.2s'
                            }}>
                                • {s}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>METRICS</span>
                        {Object.entries(metricsMap).map(([k, v]) => (
                            <button key={k} onClick={() => setMetric(k)} style={{
                                background: metric === k ? getChartColor() : 'transparent',
                                color: metric === k ? '#000' : 'var(--text-muted)',
                                border: `1px solid ${metric === k ? getChartColor() : 'var(--panel-border)'}`,
                                padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: metric === k ? 'bold' : 'normal', transition: '0.2s'
                            }}>
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '5px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '6px' }}>
                    {['Line', 'Area', 'Bar'].map(t => (
                        <button key={t} onClick={() => setChartType(t)} style={{
                            background: chartType === t ? 'var(--panel-border)' : 'transparent', color: chartType === t ? '#fff' : 'var(--text-muted)',
                            border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer'
                        }}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* SubTitles */}
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title" style={{ fontSize: '1.2rem' }}>Monthly {metricsMap[metric]} Breakdown</h3>
                <p className="panel-subtitle">Tgl Faktur (monthly) · Sales / Total Faktur / GP / Diskon · Group vs Regular</p>
            </div>

            {/* Chart Area */}
            <div style={{ height: '400px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'Area' ? (
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAll" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.4} />
                                    <stop offset="95%" stopColor={getChartColor()} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={formatB} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }} formatter={(v) => formatB(v)}
                            />
                            <Legend iconType="circle" />
                            {segment === 'All' && <Area type="monotone" dataKey="All" stroke={getChartColor()} strokeWidth={3} fillOpacity={1} fill="url(#colorAll)" />}
                            {segment === 'Regular' && <Area type="monotone" dataKey="Regular" stroke="var(--accent-cyan)" strokeWidth={3} fillOpacity={1} fill="url(#colorAll)" />}
                            {segment === 'Group' && <Area type="monotone" dataKey="Group" stroke="var(--accent-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorAll)" />}
                        </AreaChart>
                    ) : (
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={formatB} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }} formatter={(v) => formatB(v)}
                            />
                            <Legend iconType="circle" />
                            {segment === 'All' && <Line type="monotone" dataKey="All" stroke={getChartColor()} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                            {segment === 'Regular' && <Line type="monotone" dataKey="Regular" stroke="var(--accent-cyan)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                            {segment === 'Group' && <Line type="monotone" dataKey="Group" stroke="var(--accent-purple)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⚡ <span style={{ color: '#fff' }}>Ramadan effect</span> May dip -6% vs Apr, recovered Jun</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📊 <span style={{ color: '#fff' }}>Group share ↑</span> +3.8pp YoY — corporate acquisition working</div>
            </div>
        </div>
    );
};

export default MasterTrendChart;
