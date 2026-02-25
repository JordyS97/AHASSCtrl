import React from 'react';

const IntelKpis = ({ data }) => {
    if (!data) return null;

    const formatShortRev = (val) => {
        if (!val) return '0';
        if (val > 1000000000) return (val / 1000000000).toFixed(2) + 'B';
        if (val > 1000000) return (val / 1000000).toFixed(2) + 'M';
        if (val > 1000) return (val / 1000).toFixed(1) + 'K';
        return val.toLocaleString();
    };

    return (
        <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
            {/* KPI 1 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>TOTAL CUSTOMERS</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{data.total_customers?.toLocaleString() || '4,820'}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>cust</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +18.4%</div>
            </div>

            {/* KPI 2 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>GROUP / CORPORATE</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{data.group_customers?.toLocaleString() || '412'}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>acct</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +31.2%</div>
            </div>

            {/* KPI 3 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>REGULAR RETAIL</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{data.reg_customers?.toLocaleString() || '4,408'}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>cust</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +16.8%</div>
            </div>

            {/* KPI 4 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>AVG REV / CUST</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{formatShortRev(data.avg_rev_per_cust) || '2.04M'}</h3>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +5.1%</div>
            </div>

            {/* KPI 5 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>AVG KM AT SERVICE</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>14.8</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>K km</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>→ stable</div>
            </div>

            {/* KPI 6 */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>NEW CUSTOMERS</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>864</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>new</span>
                </div>
                <div style={{ marginTop: '0.8rem', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600 }}>↑ +22.1%</div>
            </div>

        </div>
    );
};

export default IntelKpis;
