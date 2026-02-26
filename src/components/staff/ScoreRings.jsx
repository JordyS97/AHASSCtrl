import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ScoreRings = ({ saList, mecList }) => {

    // Calculate grade distribution strings (A+, A, B+, etc)
    const saDict = {};
    saList.forEach(s => { saDict[s.grade] = (saDict[s.grade] || 0) + 1; });
    const mecDict = {};
    mecList.forEach(m => { mecDict[m.grade] = (mecDict[m.grade] || 0) + 1; });

    const saData = Object.keys(saDict).map(k => ({ name: `Grade ${k}`, value: saDict[k] })).sort((a, b) => b.value - a.value);
    const mecData = Object.keys(mecDict).map(k => ({ name: `Grade ${k}`, value: mecDict[k] })).sort((a, b) => b.value - a.value);

    // Color definitions
    const COLORS = ['#FFB800', 'var(--accent-green)', 'var(--accent-cyan)', '#FF7B54', '#9B51E0', 'var(--accent-red)'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-panel" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                    <span style={{ color: payload[0].payload.fill }}>{payload[0].name}</span>: {payload[0].value} staff
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '320px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Letter Grade Composition</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>SA vs Mechanic rating curves</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255, 184, 0, 0.3)', borderRadius: '12px', color: '#FFB800' }}>DEMO RADIAL</div>
            </div>

            <div style={{ flex: 1, display: 'flex' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>SERVICE ADVISOR</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={saData}
                                innerRadius={45}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {saData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 1rem' }}></div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>MECHANIC</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mecData}
                                innerRadius={45}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {mecData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ScoreRings;
