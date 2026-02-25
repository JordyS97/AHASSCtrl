import React from 'react';
import advancedData from '../advanced_dashboard_data.json';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RetentionLoyalty = () => {
    const defaultData = { repeat_rate: 0, total_customers: 0 };
    const regRet = advancedData?.retention?.Regular || defaultData;
    const grpRet = advancedData?.retention?.Group || defaultData;

    const renderDonut = (rate, color, bgColor) => {
        const data = [
            { name: 'Repeat', value: rate },
            { name: 'One-Time', value: 100 - rate }
        ];
        return (
            <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={45}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill={bgColor} />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-color)' }} />
                    </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {rate}%
                </div>
            </div>
        );
    };

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 className="panel-title">Customer Retention</h3>
                <p className="panel-subtitle">Repeat VS One-time Customers</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Regular</div>
                    {renderDonut(regRet.repeat_rate, 'var(--accent-cyan)', 'rgba(0, 242, 254, 0.1)')}
                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Out of <span style={{ color: '#fff', fontWeight: 'bold' }}>{regRet.total_customers.toLocaleString()}</span> customers
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Group / Corp</div>
                    {renderDonut(grpRet.repeat_rate, 'var(--accent-purple)', 'rgba(168, 85, 247, 0.1)')}
                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Out of <span style={{ color: '#fff', fontWeight: 'bold' }}>{grpRet.total_customers.toLocaleString()}</span> customers
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RetentionLoyalty;
