import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DistanceDonut = () => {
    const data = [
        { name: '< 5km (Hyper-Local)', value: 41, color: 'var(--accent-cyan)' },
        { name: '5 - 15km (City Reach)', value: 38, color: 'var(--accent-purple)' },
        { name: '15 - 30km (Metro)', value: 16, color: 'var(--accent-green)' },
        { name: '> 30km (Regional)', value: 5, color: 'var(--accent-orange)' },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'rgba(10, 15, 30, 0.9)', padding: '0.8rem', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '8px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>{payload[0].name}</p>
                    <p style={{ fontWeight: 800, color: payload[0].payload.color }}>{payload[0].value}% of Base</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Proximity Distribution</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Approx distance to workshop</p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', minHeight: '180px' }}>
                <div style={{ width: '160px', height: '160px', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Inner Label */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>100%</span>
                        <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: 1 }}>MAPPED</span>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1.5rem' }}>
                    {data.map(d => (
                        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: 10, height: 10, background: d.color, borderRadius: '50%', boxShadow: `0 0 8px ${d.color}` }}></div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.8rem', color: '#ececec', fontWeight: 500 }}>{d.name}</p>
                            </div>
                            <span style={{ fontWeight: 700, color: d.color, fontSize: '0.85rem' }}>{d.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistanceDonut;
