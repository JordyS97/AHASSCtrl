import React from 'react';

const formatNum = (num) => {
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

const MechanicDetailPanel = ({ mec }) => {
    if (!mec) return <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Select a Mechanic</div>;

    // Modeling score proxies for visual display
    const throughputScore = Math.min((mec.units / 1700) * 100, 100); // 1700 is theoretical peak annual
    const timeEff = Math.max(100 - ((mec.avg_time - 35) * 1.5), 0); // Baseline 35min is 100%

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(0, 242, 254, 0.3)' }}>

            {/* Header: Avatar, Name, Grade Ring */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '50px', height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(0, 242, 254, 0.1)',
                        border: '2px solid var(--accent-green)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', color: 'var(--accent-green)', fontWeight: 'bold'
                    }}>
                        {getInitials(mec.name)}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{mec.name}</h2>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '1px' }}>MECHANIC · SELECTED</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>GRADE</div>
                    <div style={{
                        width: '50px', height: '50px',
                        borderRadius: '50%',
                        border: `3px solid ${mec.grade.includes('A') ? 'var(--accent-green)' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', color: mec.grade.includes('A') ? 'var(--accent-green)' : mec.grade.includes('B') ? 'var(--accent-cyan)' : 'var(--accent-red)',
                        fontWeight: 'bold',
                        boxShadow: `0 0 10px ${mec.grade.includes('A') ? 'rgba(0, 255, 0, 0.2)' : 'transparent'}`
                    }}>
                        {mec.grade}
                    </div>
                </div>
            </div>

            {/* 4 Cards Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>ANNUAL UNITS</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-green)', fontWeight: 'bold', marginTop: '0.2rem' }}>{formatNum(mec.units)}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>AVG TIME/UNIT</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginTop: '0.2rem' }}>{mec.avg_time} <span style={{ fontSize: '0.7rem' }}>MIN</span></div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>FIRST-PASS RATE</div>
                    <div style={{ fontSize: '1.3rem', color: '#FFB800', fontWeight: 'bold', marginTop: '0.2rem' }}>{mec.quality_pct}%</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>REWORK JOBS</div>
                    <div style={{ fontSize: '1.3rem', color: 'var(--accent-red)', fontWeight: 'bold', marginTop: '0.2rem' }}>{mec.rework_jobs}</div>
                </div>
            </div>

            {/* 5 Linear Animated Bars */}
            <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>TECHNICAL METRICS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <AnimatedBar label="Throughput Score" value={Math.round(throughputScore)} color="var(--accent-green)" />
                    <AnimatedBar label="Quality Score" value={Math.round(mec.quality_pct)} color="#FFB800" />
                    <AnimatedBar label="Time Efficiency" value={Math.round(timeEff)} color="var(--accent-cyan)" />
                    <AnimatedBar label="Parts Accuracy" value={Math.round(mec.parts_acc)} color="#9B51E0" />
                    <AnimatedBar label="Complex Job Rate" value={Math.round(mec.complex_pct)} color="#FF7B54" />
                    <AnimatedBar label="Inspector Pass Rate" value={Math.round(mec.insp_pass)} color="#4A90E2" />
                </div>
            </div>

        </div>
    );
};

export default MechanicDetailPanel;
