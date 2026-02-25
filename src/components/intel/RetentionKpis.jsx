import React from 'react';

const RetentionKpis = ({ data }) => {
    // We mock the granular percentages if not present in the aggregate layer yet
    return (
        <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {/* KPI 1 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-cyan)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>RETENTION RATE</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>64.2</h3>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +4.1pp</div>
            </div>

            {/* KPI 2 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--danger-red)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>CHURN RATE</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>18.4</h3>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 80, 80, 0.1)', color: 'var(--danger-red)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +1.2pp risk</div>
            </div>

            {/* KPI 3 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-orange)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>AT-RISK CUSTOMERS</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>342</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>cust</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 165, 0, 0.1)', color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 600 }}>Need action</div>
            </div>

            {/* KPI 4 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-green)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>AVG VISIT INTERVAL</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>128</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>days</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 255, 128, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 600 }}>↓ -8d improved</div>
            </div>

            {/* KPI 5 */}
            <div className="glass-panel" style={{ padding: '1rem', borderTop: '2px solid var(--accent-purple)' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>REPEAT RATE (2+ VISITS)</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>56.8</h3>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 255, 128, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +6.2%</div>
            </div>
        </div>
    );
};

export default RetentionKpis;
