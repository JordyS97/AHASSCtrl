import React, { useState } from 'react';

const DistrictReachHeatmap = ({ hierarchy, months }) => {
    const [expandedKabs, setExpandedKabs] = useState({});

    const toggleExpand = (kab) => {
        setExpandedKabs(prev => ({ ...prev, [kab]: !prev[kab] }));
    };

    if (!hierarchy || !months || months.length === 0) {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>District Reach Timeline</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>No geography data available</p>
            </div>
        );
    }

    // Find global max for intensity scaling
    const allVals = hierarchy.flatMap(h => [...h.months, ...h.children.flatMap(c => c.months)]);
    const maxVal = Math.max(...allVals, 1);

    const getIntensity = (val) => {
        const ratio = val / maxVal;
        if (ratio > 0.7) return 'rgba(0, 242, 254, 1)';
        if (ratio > 0.5) return 'rgba(0, 242, 254, 0.7)';
        if (ratio > 0.3) return 'rgba(0, 242, 254, 0.5)';
        if (ratio > 0.15) return 'rgba(0, 242, 254, 0.3)';
        if (ratio > 0.05) return 'rgba(0, 242, 254, 0.15)';
        if (val > 0) return 'rgba(0, 242, 254, 0.07)';
        return 'rgba(255, 255, 255, 0.02)';
    };

    const getTextColor = (val) => {
        const ratio = val / maxVal;
        if (ratio > 0.5) return '#000';
        return 'transparent';
    };

    const renderMonthCells = (monthData, isChild = false) => {
        return monthData.map((val, i) => (
            <td key={i} style={{ padding: '0.1rem' }}>
                <div style={{
                    background: getIntensity(val),
                    color: getTextColor(val),
                    padding: isChild ? '0.3rem 0.1rem' : '0.4rem 0.2rem',
                    borderRadius: '2px',
                    textAlign: 'center',
                    fontSize: isChild ? '0.6rem' : '0.65rem',
                    fontWeight: 600,
                    transition: '0.2s',
                    cursor: 'pointer',
                    minWidth: isChild ? '28px' : '32px'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = val > 0 ? (val / maxVal > 0.5 ? '#000' : '#fff') : 'transparent';
                        if (val > 0) e.currentTarget.innerText = val.toLocaleString();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = getTextColor(val);
                        e.currentTarget.innerText = val / maxVal > 0.5 ? val.toLocaleString() : '';
                    }}
                >
                    {val / maxVal > 0.5 ? val.toLocaleString() : ''}
                </div>
            </td>
        ));
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>District Reach Timeline</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Kabupaten → Kecamatan active volume by Month (click to expand)</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>REACH</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: 1 }}>
                        <th style={{ padding: '0 0.5rem 0.5rem 0', textAlign: 'left', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)', minWidth: '130px' }}>KABUPATEN / KEC</th>
                        <th style={{ padding: '0 0 0.5rem 0', textAlign: 'right', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)', minWidth: '45px' }}>CUST</th>
                        {months.map(m => (
                            <th key={m} style={{ padding: '0 0 0.5rem 0', textAlign: 'center', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hierarchy.map((kab) => {
                        const isExpanded = expandedKabs[kab.kabupaten];
                        return (
                            <React.Fragment key={kab.kabupaten}>
                                {/* Kabupaten Row */}
                                <tr
                                    onClick={() => toggleExpand(kab.kabupaten)}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottom: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.03)',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '0.6rem 0.5rem 0.6rem 0', color: '#ececec', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem', marginRight: '0.4rem' }}>
                                            {isExpanded ? '▼' : '▶'}
                                        </span>
                                        {kab.kabupaten}
                                    </td>
                                    <td style={{ padding: '0.6rem 0', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                        {kab.cust.toLocaleString()}
                                    </td>
                                    {renderMonthCells(kab.months)}
                                </tr>

                                {/* Kecamatan Children (expanded) */}
                                {isExpanded && kab.children.map((kec) => (
                                    <tr key={`${kab.kabupaten}-${kec.name}`} style={{
                                        borderBottom: '1px solid rgba(255,255,255,0.02)',
                                        background: 'rgba(0, 242, 254, 0.02)'
                                    }}>
                                        <td style={{ padding: '0.4rem 0.5rem 0.4rem 1.5rem', color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                            ↳ {kec.name}
                                        </td>
                                        <td style={{ padding: '0.4rem 0', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                            {kec.cust.toLocaleString()}
                                        </td>
                                        {renderMonthCells(kec.months, true)}
                                    </tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DistrictReachHeatmap;
