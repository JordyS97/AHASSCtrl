import React from 'react';
import { useData } from '../DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const StaffAllocation = () => {
    const { datasets } = useData();
    const advancedData = datasets.advanced;
    const saData = advancedData?.staffAllocation || [];

    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Staff Allocation by Class</h3>
                <p className="panel-subtitle">Revenue Load by SA (in Millions)</p>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={saData} margin={{ top: 20, right: 0, left: -20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            formatter={(value) => `${value} Jt`}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="Regular" stackId="a" fill="var(--accent-cyan)" />
                        <Bar dataKey="Group" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StaffAllocation;
