import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (err) {
            setError(err.message === 'Invalid login credentials'
                ? 'Invalid email or password. Please try again.'
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)',
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 242, 254, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(170, 80, 255, 0.03) 0%, transparent 50%)',
            padding: '1rem'
        }}>
            {/* Background grid */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                pointerEvents: 'none'
            }} />

            <div style={{
                width: '100%',
                maxWidth: '420px',
                position: 'relative',
                zIndex: 1,
                animation: 'fadeInUp 0.6s ease-out'
            }}>
                {/* Logo & Branding */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: 48, height: 48,
                            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                            borderRadius: 12,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#000', fontWeight: 'bold', fontSize: '1.2rem',
                            boxShadow: '0 4px 20px rgba(0, 242, 254, 0.3)'
                        }}>AH</div>
                        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                            AHASS <span style={{ color: 'var(--accent-cyan)' }}>CTRL</span>
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Operational Intelligence Dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-panel" style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 242, 254, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 242, 254, 0.05)'
                }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
                        Sign In
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                        Enter your credentials to access the dashboard
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@company.com"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={e => { e.target.style.borderColor = 'var(--accent-cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 242, 254, 0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={e => { e.target.style.borderColor = 'var(--accent-cyan)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 242, 254, 0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '0.8rem 1rem',
                                background: 'rgba(255, 80, 80, 0.1)',
                                border: '1px solid rgba(255, 80, 80, 0.3)',
                                borderRadius: '8px',
                                color: '#ff5050',
                                fontSize: '0.85rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '0.9rem',
                                background: loading
                                    ? 'rgba(0, 242, 254, 0.3)'
                                    : 'linear-gradient(135deg, var(--accent-cyan), rgba(0, 200, 220, 1))',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#000',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                                marginTop: '0.5rem'
                            }}
                            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(0, 242, 254, 0.4)'; } }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(0, 242, 254, 0.3)'; }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    © 2026 AHASS CTRL — Operational Intelligence Platform
                </p>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
