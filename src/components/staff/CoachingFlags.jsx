import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

const CoachingFlags = ({ saList, mecList }) => {

    // Find all underperforming staff (Grade C or D)
    const underperformingSa = saList.filter(s => s.grade === 'C' || s.grade === 'D' || s.grade === 'E');
    const underperformingMec = mecList.filter(m => m.grade === 'C' || m.grade === 'D' || m.grade === 'E');

    const totalFlags = underperformingSa.length + underperformingMec.length;

    if (totalFlags === 0) {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                No immediate coaching interventions required. Team is performing optimally.
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255, 82, 82, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ color: 'var(--accent-red)' }}><AlertCircle size={24} /></div>
                    <div>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-red)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Active Coaching Interventions Required</h3>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{totalFlags} staff members dropped below acceptable KPI thresholds.</p>
                    </div>
                </div>
            </div>

            <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* SA Flags */}
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>SERVICE ADVISOR VULNERABILITIES</div>
                    {underperformingSa.length === 0 ? <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>None detected.</div> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {underperformingSa.map((sa, idx) => (
                                <div key={idx} style={{ padding: '0.8rem', background: 'rgba(255, 82, 82, 0.05)', border: '1px solid rgba(255, 82, 82, 0.1)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>{sa.name}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--accent-red)', marginTop: '2px' }}>
                                            Grade {sa.grade} | High Discount ({sa.discount_pct}%)
                                        </div>
                                    </div>
                                    <ChevronRight size={14} color="var(--text-muted)" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mechanic Flags */}
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>MECHANIC VULNERABILITIES</div>
                    {underperformingMec.length === 0 ? <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>None detected.</div> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {underperformingMec.map((mec, idx) => (
                                <div key={idx} style={{ padding: '0.8rem', background: 'rgba(255, 82, 82, 0.05)', border: '1px solid rgba(255, 82, 82, 0.1)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>{mec.name}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--accent-red)', marginTop: '2px' }}>
                                            Grade {mec.grade} | High Rework ({mec.rework_jobs})
                                        </div>
                                    </div>
                                    <ChevronRight size={14} color="var(--text-muted)" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CoachingFlags;
