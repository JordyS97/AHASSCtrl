import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../DataContext';

const UnitEntryTrend = () => {
    const { dailyTrends } = useData();

    if (!dailyTrends || dailyTrends.length === 0) {
        return <div className="glass-panel" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No data for selected range</div>;
    }

    return (
        <div className="glass-panel" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Unit Entry Trends</h3>
                <p className="panel-subtitle">Daily unique PKB count</p>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="var(--text-muted)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{
                                backgroundColor: 'var(--bg-color)',
                                border: '1px solid var(--panel-border)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                        />
                        <Bar
                            dataKey="units"
                            fill="var(--accent-purple)"
                            radius={[4, 4, 0, 0]}
                            barSize={12}
                        >
                            {dailyTrends.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === dailyTrends.length - 1 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UnitEntryTrend;
