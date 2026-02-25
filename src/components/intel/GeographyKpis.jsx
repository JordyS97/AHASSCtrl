import React from 'react';

const GeographyKpis = ({ data }) => {
    return (
        <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {/* KPI 1 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-cyan)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>KABUPATEN COVERED</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>8</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>kab</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>+2 new areas</div>
            </div>

            {/* KPI 2 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-purple)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>KECAMATAN REACHED</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>42</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>kec</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 255, 128, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +8 YoY</div>
            </div>

            {/* KPI 3 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-green)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>TOP DISTRICT REVENUE</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>2.84</h3>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>B</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 255, 128, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 600 }}>Kab. Bandung</div>
            </div>

            {/* KPI 4 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-orange)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>FURTHEST CUSTOMER</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>48</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>km</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>Market signal</div>
            </div>
        </div>
    );
};

export default GeographyKpis;
