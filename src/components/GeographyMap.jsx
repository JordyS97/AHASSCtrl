import React from 'react';
import { useData } from '../DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const GeographyMap = () => {
    const { datasets } = useData();
    const advancedData = datasets.advanced;
    const geoData = advancedData?.geography || [];

    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Regional Concentration</h3>
                <p className="panel-subtitle">Top Districts by Segment (Customer Volume)</p>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geoData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="kabupaten" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={100} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Bar dataKey="Regular" stackId="a" fill="var(--accent-cyan)" />
                        <Bar dataKey="Group" stackId="a" fill="var(--accent-purple)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GeographyMap;
