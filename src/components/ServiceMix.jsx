import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useData } from '../DataContext';

const ServiceMix = () => {
    const { datasets } = useData();
    const dashboardData = datasets.dashboard;
    if (!dashboardData) return <div className="glass-panel" style={{ height: '350px', color: 'var(--text-muted)', padding: '2rem' }}>Loading...</div>;
    const data = dashboardData.serviceMix || [];
    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Visit Type Distribution</h3>
                <p className="panel-subtitle">Nama Tipe Kedatangan per segment</p>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="type" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="regular" name="Regular" stackId="a" fill="var(--accent-cyan)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="group" name="Group" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ServiceMix;
