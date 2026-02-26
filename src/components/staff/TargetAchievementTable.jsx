import React from 'react';

const AnimatedBar = ({ label, target, actual, format, color }) => {
    // We treat target as 100% bounds
    let pct = 0;

    // Determine bounds scaling logic.
    if (label.includes('Discount') || label.includes('Rework')) {
        // Lower is better, meaning target is the upper limit warning
        // Assuming target discount is 5%, actual 5.5% means we failed. 4% means we are under.
        // Visually we can just map the actual % directly.
        pct = Math.min((actual / (target * 1.5)) * 100, 100);
    } else {
        pct = Math.min((actual / target) * 100, 100);
    }

    const isError = (label.includes('Discount') || label.includes('Rework') || label.includes('Time'))
        ? (actual > target)
        : (actual < target);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '130px', color: 'var(--text-main)', fontWeight: 500 }}>{label}</div>

            <div style={{ width: '80px', color: 'var(--text-muted)' }}>Target: <span style={{ color: '#fff' }}>{format ? format(target) : target}</span></div>

            <div style={{ flex: 1, position: 'relative', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: isError ? 'var(--accent-red)' : color, borderRadius: '3px', transition: 'width 1s ease-in-out' }}></div>
                {/* Marker for target (100% or relative) */}
                <div style={{ position: 'absolute', top: -3, bottom: -3, left: `${Math.min((target / Math.max(target, actual)) * 100, 100)}%`, width: '2px', background: '#FFB800', opacity: 0.5 }}></div>
            </div>

            <div style={{ width: '80px', textAlign: 'right', color: isError ? 'var(--accent-red)' : color, fontWeight: 'bold' }}>
                {format ? format(actual) : actual} {isError && <span style={{ marginLeft: 4 }}>!</span>}
            </div>
        </div>
    );
};

const TargetAchievementTable = ({ saKpis, mecKpis }) => {

    const numFmt = (n) => typeof n === 'number' ? n.toLocaleString() : n;
    const curFmt = (n) => numFmt(Math.round(n / 1000000)) + 'M';
    const pctFmt = (n) => n.toFixed(1) + '%';
    const minFmt = (n) => n.toFixed(0) + 'm';

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '320px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Team Target Achievement</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Global aggregated performance vs theoretical capacity targets</p>
                </div>
                <div style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>BULLSEYE</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <AnimatedBar label="Group Sales Goal" target={80000000000} actual={saKpis.total_rev || 0} format={curFmt} color="#FFB800" />
                <AnimatedBar label="Throughput Quota" target={35000} actual={saKpis.total_pkb || 0} format={numFmt} color="var(--accent-green)" />
                <AnimatedBar label="Avg GP Margin" target={35.0} actual={37.4} format={pctFmt} color="var(--accent-cyan)" />
                <AnimatedBar label="Avg Discount Risk" target={4.5} actual={saKpis.avg_discount || 0} format={pctFmt} color="#9B51E0" />
                <AnimatedBar label="Service Speed Max" target={40} actual={mecKpis.avg_time || 0} format={minFmt} color="#FF7B54" />
                <AnimatedBar label="First-Pass Quality" target={95.0} actual={mecKpis.avg_quality || 0} format={pctFmt} color="#4A90E2" />
            </div>
        </div>
    );
};

export default TargetAchievementTable;
