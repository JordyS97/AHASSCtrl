import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FleetProfile = ({ fleet }) => {
    if (!fleet) return null;

    const kmBins = fleet.km_bins || {};
    const yearBins = fleet.year_bins || {};

    const kmData = ['<5K', '5-10K', '10-15K', '15-20K', '20-25K', '25-30K', '>30K'].map((label, idx) => ({
        name: label,
        Regular: (kmBins.Regular || [])[idx] || 0,
        Group: (kmBins.Group || [])[idx] || 0,
    }));

    const yearData = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((yr, idx) => ({
        name: yr,
        Regular: (yearBins.Regular || [])[idx] || 0,
        Group: (yearBins.Group || [])[idx] || 0,
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'rgba(10, 15, 30, 0.9)', padding: '0.8rem', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '8px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{label}</p>
                    {payload.map((entry, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: entry.color }}>{entry.name}</span>
                            <span style={{ fontWeight: 'bold' }}>{entry.value.toLocaleString()} units</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Fleet Profile</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Tahun Rakit & KM Distribution</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>FLEET</div>
            </div>

            {/* Assembly Year Distribution */}
            <div style={{ flex: 1, minHeight: 180 }}>
                <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.8rem' }}>ASSEMBLY YEAR DISTRIBUTION</p>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={yearData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="Group" stackId="a" fill="var(--accent-purple)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Regular" stackId="a" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* KM Distribution */}
            <div style={{ flex: 1, minHeight: 180 }}>
                <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.8rem' }}>KM AT SERVICE (avg trip)</p>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={kmData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="Group" stackId="a" fill="var(--accent-purple)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Regular" stackId="a" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                    <p className="text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1 }}>MEDIAN KM</p>
                    <p style={{ fontWeight: 800, fontSize: '1rem' }}>14,820</p>
                </div>
                <div>
                    <p className="text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1 }}>AVG YEAR</p>
                    <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-cyan)' }}>2021.4</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p className="text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1 }}>TOP MODEL</p>
                    <p style={{ fontWeight: 800, fontSize: '1rem' }}>BeAT</p>
                </div>
            </div>

        </div>
    );
};

export default FleetProfile;
