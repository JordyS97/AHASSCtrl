import React from 'react';

const formatNum = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

const CollaborationMatrix = ({ matrix, saList, mecList }) => {
    if (!matrix || !saList || !mecList || matrix.length === 0) return null;

    // Use top 12 SAs and top 12 Mechanics to form the grid so it isn't completely massive
    const displaySa = saList.slice(0, 12);
    const displayMec = mecList.slice(0, 12);

    // Create a lookup dictionary
    const lookup = {};
    matrix.forEach(d => {
        if (!lookup[d.sa]) lookup[d.sa] = {};
        lookup[d.sa][d.mechanic] = d;
    });

    // Find absolute max revenue to color code
    let maxRev = 1;
    matrix.forEach(d => {
        if (d.revenue > maxRev) maxRev = d.revenue;
    });

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Revenue Collaboration Matrix (Top 12 × 12)</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>Rows: Service Advisors | Columns: Mechanics | Intensity: Revenue volume</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: 12, height: 12, background: 'rgba(255, 184, 0, 0.1)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)' }}></span>
                        Low Rev
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: 12, height: 12, background: 'rgba(255, 184, 0, 0.8)', borderRadius: '2px' }}></span>
                        High Rev
                    </div>
                </div>
            </div>

            <div style={{ minWidth: '900px' }}>
                {/* Header Row (Mechanics) */}
                <div style={{ display: 'flex', marginBottom: '4px' }}>
                    <div style={{ width: '120px', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', flex: 1, gap: '4px' }}>
                        {displayMec.map((mec, mIdx) => (
                            <div key={mIdx} style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', color: 'var(--accent-cyan)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transform: 'rotate(-45deg)', transformOrigin: 'left bottom', marginBottom: '10px', height: '40px' }}>
                                {mec.name.split(' ')[0]}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid Rows (SAs) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {displaySa.map((sa, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex' }}>
                            <div style={{ width: '120px', flexShrink: 0, fontSize: '0.7rem', color: '#FFB800', display: 'flex', alignItems: 'center', paddingRight: '10px', justifyContent: 'flex-end', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {sa.name.split(' ')[0]}
                            </div>

                            <div style={{ display: 'flex', flex: 1, gap: '4px' }}>
                                {displayMec.map((mec, mIdx) => {
                                    const cellData = lookup[sa.name] && lookup[sa.name][mec.name];
                                    const rev = cellData ? cellData.revenue : 0;

                                    // Base color is a very distinct muted state if 0, else intensive gold scale
                                    let intensity = rev === 0 ? 0 : Math.max(0.15, rev / maxRev);
                                    let bg = rev === 0 ? 'rgba(255,255,255,0.02)' : `rgba(255, 184, 0, ${intensity})`;
                                    let border = rev === 0 ? 'rgba(255,255,255,0.02)' : `rgba(255, 184, 0, ${Math.min(1, intensity + 0.2)})`;
                                    let txtColor = intensity > 0.4 ? '#000' : 'var(--text-muted)';

                                    return (
                                        <div
                                            key={mIdx}
                                            style={{
                                                flex: 1,
                                                height: '35px',
                                                background: bg,
                                                borderRadius: '2px',
                                                border: `1px solid ${border}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.6rem',
                                                color: txtColor,
                                                fontWeight: intensity > 0.4 ? 'bold' : 'normal',
                                                cursor: 'pointer'
                                            }}
                                            title={cellData ? `${sa.name} & ${mec.name}\nRevenue: ${formatNum(rev)}\nPKB: ${cellData.pkb}` : 'No Collaboration'}
                                        >
                                            {rev > 0 ? formatNum(rev) : '-'}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CollaborationMatrix;
