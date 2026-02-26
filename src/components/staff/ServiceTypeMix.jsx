import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const ServiceTypeMix = ({ mec }) => {
    if (!mec || !mec.service_mix) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Service Type Mix</h3>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Units by job type — selected mechanic</p>
                </div>
                <div style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--text-muted)' }}>MIX</div>
            </div>

            <div style={{ height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={mec.service_mix} margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="var(--text-muted)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            width={120}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '12px' }}
                            itemStyle={{ color: 'var(--accent-cyan)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={15}>
                            {mec.service_mix.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--accent-blue)' : index === 1 ? 'var(--accent-cyan)' : 'var(--panel-border)'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ServiceTypeMix;
