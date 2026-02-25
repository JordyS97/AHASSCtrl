import React from 'react';
import { Target, Flag, RefreshCw, Briefcase } from 'lucide-react';

const RetentionPlaybook = () => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>⚑ Retention Playbook</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Actionable triggers based on analytic state</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'rgba(255, 80, 80, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--danger-red)' }}>
                    <div style={{ background: 'rgba(255, 80, 80, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--danger-red)' }}>
                        <Flag size={16} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ececec', marginBottom: '0.2rem' }}>High Risk Re-engagement (675 cust)</h4>
                        <p className="text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>Deploy SMS Blast "We Miss You" with 20% Diskon Jasa promo targeting users 180+ days dormant.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'rgba(0, 242, 254, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
                    <div style={{ background: 'rgba(0, 242, 254, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-cyan)' }}>
                        <RefreshCw size={16} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ececec', marginBottom: '0.2rem' }}>2nd-Visit Conversion</h4>
                        <p className="text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>42% fail to return after visit #1. Schedule automated WhatsApp follow-ups exactly 45 days after 1st service.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'rgba(0, 255, 128, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-green)' }}>
                    <div style={{ background: 'rgba(0, 255, 128, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-green)' }}>
                        <Target size={16} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ececec', marginBottom: '0.2rem' }}>VIP Loyalty Track (312 Champions)</h4>
                        <p className="text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>Offer priority queue / fast-track scheduling to the top decile who command the highest GP margins.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'rgba(170, 80, 255, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-purple)' }}>
                    <div style={{ background: 'rgba(170, 80, 255, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-purple)' }}>
                        <Briefcase size={16} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ececec', marginBottom: '0.2rem' }}>Group Account Management</h4>
                        <p className="text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>Group accounts visit 2.4X more frequently. Standardize B2B invoicing portal to reduce admin friction.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RetentionPlaybook;
