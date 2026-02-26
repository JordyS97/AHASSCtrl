import React from 'react';
import { useData } from '../DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const SpendingPattern = () => {
    const { datasets } = useData();
    const advancedData = datasets.advanced;
    const spending = advancedData?.spending || [];

    // Transform for Recharts
    const data = spending.map(d => ({
        class: d.class,
        avgFaktur: d.avg_faktur / 1000,   // convert to thousands for easier charting
        avgDiscount: Math.abs(d.avg_discount) / 1000 // convert to thousands
    }));

    return (
        <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title">Spending & Discount Patterns</h3>
                <p className="panel-subtitle">Grouped Bar — Avg Transaction vs Avg Discount (in Thousands)</p>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="class" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}k`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            formatter={(value) => `${value.toLocaleString()}k IDR`}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Bar dataKey="avgFaktur" name="Avg Sale Vol" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="avgDiscount" name="Avg Discount given" fill="var(--accent-orange)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingPattern;
