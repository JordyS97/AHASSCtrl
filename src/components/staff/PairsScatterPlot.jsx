import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatNum = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass-panel" style={{ padding: '0.8rem', fontSize: '0.75rem', border: '1px solid var(--accent-orange)' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '4px' }}>{data.sa} × {data.mechanic}</div>
                <div style={{ color: '#FFB800' }}>Revenue: {formatNum(data.revenue)}</div>
                <div style={{ color: 'var(--accent-cyan)' }}>PKB: {data.pkb}</div>
                <div style={{ color: 'var(--accent-green)' }}>Quality: {data.quality}%</div>
            </div>
        );
    }
    return null;
};

const PairsScatterPlot = ({ matrix }) => {
    if (!matrix || matrix.length === 0) return null;

    // Filter out edge cases (zero revenue) and sort
    const validData = matrix.filter(d => d.revenue > 0);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '350px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Collaboration Synergy Plot</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>Plotting Pair Revenue (Y) vs Final Quality % (X)</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(255, 184, 0, 0.3)', borderRadius: '12px', color: '#FFB800' }}>SCATTER</div>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            type="number"
                            dataKey="quality"
                            name="Quality %"
                            domain={['dataMin - 5', 'dataMax + 2']}
                            stroke="var(--text-muted)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `${v}%`}
                        />
                        <YAxis
                            type="number"
                            dataKey="revenue"
                            name="Revenue Generated"
                            stroke="var(--text-muted)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => formatNum(v)}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
                        <Scatter name="Pairs" data={validData} fill="#FFB800" fillOpacity={0.6} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PairsScatterPlot;
