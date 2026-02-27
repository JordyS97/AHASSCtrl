import React from 'react';

const BUBBLE_COLORS = [
    { bg: 'rgba(0, 242, 254, 0.1)', border: 'var(--accent-cyan)' },
    { bg: 'rgba(170, 80, 255, 0.1)', border: 'var(--accent-purple)' },
    { bg: 'rgba(0, 255, 128, 0.1)', border: 'var(--accent-green)' },
    { bg: 'rgba(255, 165, 0, 0.1)', border: 'var(--accent-orange)' },
];

// Pre-defined layout positions for up to 10 bubbles (percentage-based)
const POSITIONS = [
    { top: '38%', left: '42%' },
    { top: '30%', left: '72%' },
    { top: '62%', left: '25%' },
    { top: '72%', left: '48%' },
    { top: '68%', left: '68%' },
    { top: '48%', left: '18%' },
    { top: '25%', left: '55%' },
    { top: '82%', left: '32%' },
    { top: '55%', left: '82%' },
    { top: '85%', left: '72%' },
];

const GeoDensityMap = ({ geo }) => {
    const data = (geo || []).slice(0, 8);
    const maxCust = data.length > 0 ? Math.max(...data.map(d => d.cust)) : 1;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Customer Density Map</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Kabupaten — bubble = cust count, color = segment mix</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>GEO MAP</div>
            </div>

            {/* Abstract Relative Node Map Grid */}
            <div style={{
                flex: 1,
                position: 'relative',
                background: 'rgba(10, 15, 30, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.02)',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                overflow: 'hidden'
            }}>

                {/* Workshop Node Center */}
                <div style={{ position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                    <div style={{ width: 12, height: 12, background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 15px var(--accent-cyan)', border: '2px solid #fff' }}></div>
                    <span style={{ position: 'absolute', top: -20, left: -25, fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Workshop</span>
                </div>

                {/* Dynamic Bubbles */}
                {data.map((item, idx) => {
                    const pos = POSITIONS[idx] || POSITIONS[0];
                    const sizeScale = Math.max(0.4, item.cust / maxCust);
                    const w = Math.round(60 + sizeScale * 90);
                    const h = Math.round(40 + sizeScale * 65);
                    const fontSize = sizeScale > 0.7 ? '1.2rem' : sizeScale > 0.4 ? '1rem' : '0.8rem';
                    const labelSize = sizeScale > 0.5 ? '0.65rem' : '0.55rem';
                    // Color: if Group% > 50% => purple, else cyan; special orange for emerging (low count)
                    let colorIdx = 0;
                    if (item.grpPct > 50) colorIdx = 1;
                    else if (item.cust < maxCust * 0.3) colorIdx = 3;
                    else if (item.grpPct > 30) colorIdx = 2;
                    const color = BUBBLE_COLORS[colorIdx];

                    return (
                        <div key={item.kabupaten} style={{
                            position: 'absolute',
                            top: pos.top,
                            left: pos.left,
                            transform: 'translate(-50%, -50%)',
                            width: `${w}px`,
                            height: `${h}px`,
                            background: color.bg,
                            border: `1px solid ${color.border}`,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'default',
                            zIndex: 5
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)'; e.currentTarget.style.boxShadow = `0 0 20px ${color.border}`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <span style={{ fontWeight: 800, fontSize, color: '#fff' }}>{item.cust.toLocaleString()}</span>
                            <span style={{ fontSize: labelSize, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2, maxWidth: '90%' }}>{item.kabupaten}</span>
                        </div>
                    );
                })}

            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-cyan)', borderRadius: '2px' }}></div> Regular dominant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-purple)', borderRadius: '2px' }}></div> Group dominant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-green)', borderRadius: '2px' }}></div> High value mix</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-orange)', borderRadius: '2px' }}></div> Emerging</div>
            </div>

        </div>
    );
};

export default GeoDensityMap;
