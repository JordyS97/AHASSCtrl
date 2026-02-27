import React from 'react';

const GeographyKpis = ({ data, kabData }) => {
    if (!data) return null;

    const formatRevenue = (val) => {
        if (val >= 1e9) return `${(val / 1e9).toFixed(2)}`;
        if (val >= 1e6) return `${(val / 1e6).toFixed(0)}`;
        return `${val}`;
    };
    const revSuffix = (val) => val >= 1e9 ? 'B' : val >= 1e6 ? 'M' : '';

    const totalKec = data.kecCount || 0;
    const totalKab = data.kabCount || 0;
    const topKabName = data.topKab || 'N/A';
    const topKabRev = data.topKabRev || 0;
    const topKabCust = data.topKabCust || 0;

    return (
        <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {/* KPI 1 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-cyan)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>KABUPATEN COVERED</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalKab}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>kab</span>
                </div>
            </div>

            {/* KPI 2 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-purple)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>KECAMATAN REACHED</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalKec}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>kec</span>
                </div>
            </div>

            {/* KPI 3 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-green)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>TOP KABUPATEN REV</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{formatRevenue(topKabRev)}</h3>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{revSuffix(topKabRev)}</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 255, 128, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 600 }}>{topKabName}</div>
            </div>

            {/* KPI 4 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-orange)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>TOP KABUPATEN CUSTOMERS</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{topKabCust.toLocaleString()}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>cust</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 165, 0, 0.1)', color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 600 }}>{topKabName}</div>
            </div>
        </div>
    );
};

export default GeographyKpis;
