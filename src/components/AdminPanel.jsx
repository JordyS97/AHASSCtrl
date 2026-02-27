import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabaseClient';
import { UserPlus, Users, Shield, ShieldCheck, ShieldX, Upload, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AdminPanel = () => {
    const { isAdmin } = useAuth();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [bulkEmails, setBulkEmails] = useState('');
    const [registerStatus, setRegisterStatus] = useState(null);
    const [activeSection, setActiveSection] = useState('users');

    const fetchUsers = useCallback(async () => {
        setLoadingUsers(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setUsers(data || []);
        setLoadingUsers(false);
    }, []);

    useEffect(() => {
        if (isAdmin) fetchUsers();
    }, [isAdmin, fetchUsers]);

    const registerUser = async (email) => {
        try {
            const res = await fetch('/api/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            return { success: true, email };
        } catch (err) {
            return { success: false, email, error: err.message };
        }
    };

    const handleSingleRegister = async (e) => {
        e.preventDefault();
        if (!newEmail.trim()) return;
        setRegisterStatus({ type: 'loading', message: `Registering ${newEmail}...` });
        const result = await registerUser(newEmail.trim());
        if (result.success) {
            setRegisterStatus({ type: 'success', message: `${newEmail} registered successfully!` });
            setNewEmail('');
            fetchUsers();
        } else {
            setRegisterStatus({ type: 'error', message: result.error });
        }
    };

    const handleBulkRegister = async () => {
        const emails = bulkEmails
            .split(/[\n,;]+/)
            .map(e => e.trim())
            .filter(e => e && e.includes('@'));
        if (emails.length === 0) return;

        setRegisterStatus({ type: 'loading', message: `Registering ${emails.length} users...` });
        const results = await Promise.all(emails.map(registerUser));
        const succeeded = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success);

        if (failed.length === 0) {
            setRegisterStatus({ type: 'success', message: `All ${succeeded} users registered successfully!` });
        } else {
            setRegisterStatus({
                type: 'error',
                message: `${succeeded} succeeded, ${failed.length} failed: ${failed.map(f => `${f.email}: ${f.error}`).join('; ')}`
            });
        }
        setBulkEmails('');
        fetchUsers();
    };

    const toggleApproval = async (userId, currentApproval) => {
        const { error } = await supabase
            .from('profiles')
            .update({ approved: !currentApproval })
            .eq('id', userId);
        if (!error) fetchUsers();
    };

    const toggleRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId);
        if (!error) fetchUsers();
    };

    if (!isAdmin) {
        return (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                <ShieldX size={48} style={{ color: 'var(--accent-orange)', marginBottom: '1rem' }} />
                <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>Access Denied</h2>
                <p className="text-muted">You need admin privileges to access this page.</p>
            </div>
        );
    }

    const tabStyle = (isActive) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        background: isActive ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
        color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
        border: isActive ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    });

    const inputStyle = {
        width: '100%',
        padding: '0.8rem 1rem',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '0.9rem',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                        Admin Panel <span style={{ color: 'var(--accent-cyan)' }}>_</span>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>Manage users and system settings</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setActiveSection('users')} style={tabStyle(activeSection === 'users')}>
                        <Users size={16} /> Users
                    </button>
                    <button onClick={() => setActiveSection('register')} style={tabStyle(activeSection === 'register')}>
                        <UserPlus size={16} /> Register
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            {registerStatus && (
                <div style={{
                    padding: '0.8rem 1.2rem',
                    borderRadius: '8px',
                    background: registerStatus.type === 'success' ? 'rgba(0, 255, 128, 0.1)' :
                        registerStatus.type === 'error' ? 'rgba(255, 80, 80, 0.1)' : 'rgba(0, 242, 254, 0.1)',
                    border: `1px solid ${registerStatus.type === 'success' ? 'rgba(0, 255, 128, 0.3)' :
                        registerStatus.type === 'error' ? 'rgba(255, 80, 80, 0.3)' : 'rgba(0, 242, 254, 0.3)'}`,
                    color: registerStatus.type === 'success' ? 'var(--accent-green)' :
                        registerStatus.type === 'error' ? '#ff5050' : 'var(--accent-cyan)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {registerStatus.type === 'success' ? <CheckCircle size={16} /> :
                        registerStatus.type === 'error' ? <XCircle size={16} /> : null}
                    {registerStatus.message}
                </div>
            )}

            {/* Users List Section */}
            {activeSection === 'users' && (
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                            Registered Users ({users.length})
                        </h3>
                        <button onClick={fetchUsers} style={{
                            padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem'
                        }}>Refresh</button>
                    </div>

                    {loadingUsers ? (
                        <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: 1 }}>
                                    <th style={{ padding: '0 0 0.8rem 0', textAlign: 'left', fontWeight: 400 }}>EMAIL</th>
                                    <th style={{ padding: '0 0 0.8rem 0', textAlign: 'center', fontWeight: 400 }}>ROLE</th>
                                    <th style={{ padding: '0 0 0.8rem 0', textAlign: 'center', fontWeight: 400 }}>STATUS</th>
                                    <th style={{ padding: '0 0 0.8rem 0', textAlign: 'center', fontWeight: 400 }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '0.8rem 0', color: '#ececec' }}>{u.email}</td>
                                        <td style={{ padding: '0.8rem 0', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                                                background: u.role === 'admin' ? 'rgba(170, 80, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                                                color: u.role === 'admin' ? 'var(--accent-purple)' : 'var(--text-muted)',
                                                border: `1px solid ${u.role === 'admin' ? 'rgba(170, 80, 255, 0.3)' : 'rgba(255,255,255,0.1)'}`
                                            }}>
                                                {u.role === 'admin' ? '👑 Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.8rem 0', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                                                background: u.approved ? 'rgba(0, 255, 128, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                                                color: u.approved ? 'var(--accent-green)' : 'var(--accent-orange)'
                                            }}>
                                                {u.approved ? '✓ Approved' : '⏳ Pending'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.8rem 0', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                <button onClick={() => toggleApproval(u.id, u.approved)}
                                                    title={u.approved ? 'Revoke access' : 'Approve access'}
                                                    style={{
                                                        padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem',
                                                        background: u.approved ? 'rgba(255, 80, 80, 0.1)' : 'rgba(0, 255, 128, 0.1)',
                                                        color: u.approved ? '#ff5050' : 'var(--accent-green)',
                                                        border: `1px solid ${u.approved ? 'rgba(255, 80, 80, 0.3)' : 'rgba(0, 255, 128, 0.3)'}`
                                                    }}>
                                                    {u.approved ? 'Revoke' : 'Approve'}
                                                </button>
                                                <button onClick={() => toggleRole(u.id, u.role)}
                                                    title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                                                    style={{
                                                        padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem',
                                                        background: 'rgba(170, 80, 255, 0.1)',
                                                        color: 'var(--accent-purple)',
                                                        border: '1px solid rgba(170, 80, 255, 0.3)'
                                                    }}>
                                                    {u.role === 'admin' ? 'Demote' : 'Promote'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Register Section */}
            {activeSection === 'register' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Single Register */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserPlus size={18} style={{ color: 'var(--accent-cyan)' }} /> Register Single User
                        </h3>
                        <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                            Default password: <code style={{ color: 'var(--accent-cyan)', background: 'rgba(0,242,254,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>AstraMotor@2026</code>
                        </p>
                        <form onSubmit={handleSingleRegister} style={{ display: 'flex', gap: '0.8rem' }}>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                                placeholder="user@company.com"
                                required
                                style={{ ...inputStyle, flex: 1 }}
                            />
                            <button type="submit" style={{
                                padding: '0.8rem 1.5rem',
                                background: 'linear-gradient(135deg, var(--accent-cyan), rgba(0, 200, 220, 1))',
                                border: 'none', borderRadius: '8px',
                                color: '#000', fontWeight: 700, cursor: 'pointer',
                                whiteSpace: 'nowrap', fontSize: '0.9rem'
                            }}>Register</button>
                        </form>
                    </div>

                    {/* Bulk Register */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={18} style={{ color: 'var(--accent-purple)' }} /> Bulk Register
                        </h3>
                        <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                            Paste multiple emails below (one per line or comma-separated). All users get password: <code style={{ color: 'var(--accent-cyan)', background: 'rgba(0,242,254,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>AstraMotor@2026</code>
                        </p>
                        <textarea
                            value={bulkEmails}
                            onChange={e => setBulkEmails(e.target.value)}
                            placeholder="user1@company.com&#10;user2@company.com&#10;user3@company.com"
                            rows={6}
                            style={{
                                ...inputStyle,
                                resize: 'vertical',
                                fontFamily: 'monospace',
                                marginBottom: '1rem'
                            }}
                        />
                        <button onClick={handleBulkRegister} style={{
                            padding: '0.8rem 1.5rem',
                            background: 'linear-gradient(135deg, var(--accent-purple), rgba(130, 60, 220, 1))',
                            border: 'none', borderRadius: '8px',
                            color: '#fff', fontWeight: 700, cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}>
                            Register All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
