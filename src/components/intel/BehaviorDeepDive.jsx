import React from 'react';

const BehaviorDeepDive = ({ behavior }) => {
    const reg = behavior?.Regular || {};
    const grp = behavior?.Group || {};

    const tableData = [
        { dim: 'Walk-in Rate', all: '58%', g: `${grp.walkinRate || 31}%`, r: `${reg.walkinRate || 64}%`, insight: 'Grp prefers booking', hl: 'g', hlColor: 'var(--accent-purple)' },
        { dim: 'Booking Rate', all: '42%', g: `${grp.bookingRate || 69}%`, r: `${reg.bookingRate || 36}%`, insight: 'Grp more structured', hl: 'g', hlColor: 'var(--accent-cyan)' },
        { dim: 'Promo Usage', all: '44%', g: `${grp.promoUsage || 28}%`, r: `${reg.promoUsage || 52}%`, insight: 'Reg promo-driven', hl: 'r', hlColor: 'var(--accent-cyan)' },
        { dim: 'Periodic Svc %', all: '48%', g: '62%', r: '42%', insight: 'Grp more systematic', hl: 'g', hlColor: 'var(--accent-purple)' },
        { dim: 'Parts Purchase', all: '34%', g: '48%', r: '28%', insight: 'Grp higher basket', hl: 'g', hlColor: 'var(--accent-purple)' },
        { dim: 'Multi-Vehicle', all: '18%', g: `${grp.multiVeh || 74}%`, r: `${reg.multiVeh || 6}%`, insight: 'Grp - fleet managers', hl: 'g', hlColor: 'var(--accent-orange)' },
        { dim: 'Cash Payment', all: '38%', g: `${grp.cash || 12}%`, r: `${reg.cash || 44}%`, insight: 'Grp uses invoice', hl: 'r', hlColor: 'var(--accent-cyan)' },
        { dim: 'Invoice / B2B', all: '11%', g: `${grp.invoice || 58}%`, r: `${reg.invoice || 2}%`, insight: 'Grp - corporate billing', hl: 'g', hlColor: 'var(--accent-purple)' },
        { dim: 'Avg Days Between Visit', all: '128d', g: '59d', r: '142d', insight: 'Grp 2.4× more frequent', hl: 'r', hlColor: 'var(--accent-green)' },
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Customer Behavior Deep-Dive</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Tipe Kedatangan • Jenis • Payment • Booking • per Segment</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BEHAVIOR</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', textAlign: 'left', letterSpacing: 1 }}>
                        <th style={{ paddingBottom: '1rem', fontWeight: 400 }}>BEHAVIOR DIMENSION</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 400, textAlign: 'center' }}>ALL<br />CUST</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 400, textAlign: 'center' }}><span style={{ padding: '0.2rem 0.6rem', border: '1px solid var(--accent-purple)', borderRadius: '12px', color: 'var(--accent-purple)' }}>GROUP</span></th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 400, textAlign: 'center' }}><span style={{ padding: '0.2rem 0.6rem', background: 'rgba(0, 242, 254, 0.2)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>REGULAR</span></th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 400, textAlign: 'right' }}>INSIGHT</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '1rem 0', fontWeight: 500, color: '#ececec' }}>{row.dim}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>{row.all}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--accent-purple)', fontWeight: row.hl === 'g' ? 700 : 400 }}>{row.g}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--accent-cyan)', fontWeight: row.hl === 'r' ? 700 : 400 }}>{row.r}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'right', color: row.hlColor, fontSize: '0.75rem' }}>{row.insight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BehaviorDeepDive;
