import React from 'react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const AnimatedBar = ({ label, value, color }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
            <div style={{ width: '120px', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(value, 100)}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease-in-out' }}></div>
            </div>
            <div style={{ width: '40px', textAlign: 'right', color: color, fontWeight: 500 }}>{value}%</div>
        </div>
    );
};

const SaDetailPanel = ({ sa }) => {
    if (!sa) return <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Select a Service Advisor</div>;

    // Approximating achievement vs highest revenue in typical team, say 3 Billion target.
    const achRev = Math.min((sa.revenue / 3000000000) * 100, 100);
    // Discount discipline: 0% discount = 100% disciplined. 10% discount = 0% disciplined.
    const discDisc = Math.max(100 - (sa.discount_pct * 10), 0);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255, 184, 0, 0.3)' }}>

            {/* Header: Avatar, Name, Grade Ring */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '50px', height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(0, 242, 254, 0.1)',
                        border: '2px solid var(--accent-cyan)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: 'bold'
                    }}>
                        {getInitials(sa.name)}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{sa.name}</h2>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '1px' }}>SERVICE ADVISOR · SELECTED</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>GRADE</div>
                    <div style={{
                        width: '50px', height: '50px',
                        borderRadius: '50%',
                        border: `3px solid ${sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', color: sa.grade.includes('A') ? '#FFB800' : sa.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                        fontWeight: 'bold',
                        boxShadow: `0 0 10px ${sa.grade.includes('A') ? 'rgba(255, 184, 0, 0.3)' : 'transparent'}`
                    }}>
                        {sa.grade}
                    </div>
                </div>
            </div>

            {/* 4 Cards Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>ANNUAL REVENUE</div>
                    <div style={{ fontSize: '1.3rem', color: '#FFB800', fontWeight: 'bold', marginTop: '0.2rem' }}>{formatNum(sa.revenue)}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>TOTAL PKB</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginTop: '0.2rem' }}>{sa.pkb.toLocaleString()}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>GP GENERATED</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-green)', fontWeight: 'bold', marginTop: '0.2rem' }}>{formatNum(sa.gp)}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>AVG DISCOUNT</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-red)', fontWeight: 'bold', marginTop: '0.2rem' }}>{sa.discount_pct}%</div>
                </div>
            </div>

            {/* 6 Linear Animated Bars */}
            <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>PERFORMANCE METRICS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <AnimatedBar label="Revenue Achievement" value={Math.round(achRev)} color="#FFB800" />
                    <AnimatedBar label="GP Margin" value={Math.round(sa.gp_margin)} color="var(--accent-green)" />
                    <AnimatedBar label="Booking Conversion" value={Math.round(sa.booking_pct)} color="var(--accent-cyan)" />
                    <AnimatedBar label="Customer Retention" value={Math.round(sa.retention_pct)} color="#9B51E0" />
                    <AnimatedBar label="Discount Discipline" value={Math.round(discDisc)} color="#FF7B54" />
                    <AnimatedBar label="Group Acct Handling" value={Math.round(sa.group_pct)} color="#4A90E2" />
                </div>
            </div>

        </div>
    );
};

export default SaDetailPanel;
