import React, { useState } from 'react';
import './index.css';
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider } from './DataContext';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  PieChart,
  Map,
  Briefcase,
  Wrench,
  UserCircle,
  Upload,
  Shield,
  LogOut
} from 'lucide-react';

// Login
import LoginPage from './components/LoginPage';

// Dashboard components
import KpiCards from './components/KpiCards';
import FinancialFlow from './components/FinancialFlow';
import OperationalTrends from './components/OperationalTrends';
import ServiceMix from './components/ServiceMix';
import ResourcePerformance from './components/ResourcePerformance';
import PartsFavorites from './components/PartsFavorites';

// Revenue Trend Expansion
import RevenueDashboard from './components/RevenueDashboard';

// Customer Intel Hub
import CustomerIntelDashboard from './components/CustomerIntelDashboard';

// Staff Performance Hub
import StaffPerformanceDashboard from './components/StaffPerformanceDashboard';

// Data Upload
import DataUpload from './components/DataUpload';

// Admin Panel
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const { user, profile, isAdmin, isApproved, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-color)', color: 'var(--accent-cyan)', fontSize: '1.1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#000', fontWeight: 'bold', fontSize: '1.2rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>AH</div>
          <p>Loading AHASS CTRL...</p>
        </div>
      </div>
    );
  }

  // Not logged in → show login
  if (!user) return <LoginPage />;

  // Logged in but not approved → show pending screen
  if (!isApproved && !isAdmin) {
    return (
      <div style={{
        minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-color)',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 242, 254, 0.03) 0%, transparent 50%)',
        padding: '1rem'
      }}>
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none'
        }} />
        <div className="glass-panel" style={{
          maxWidth: '420px', padding: '3rem', textAlign: 'center',
          borderRadius: '16px', position: 'relative', zIndex: 1,
          border: '1px solid rgba(255, 165, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{
            width: 64, height: 64, margin: '0 auto 1.5rem',
            background: 'rgba(255, 165, 0, 0.1)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255, 165, 0, 0.3)'
          }}>
            <Shield size={28} style={{ color: 'var(--accent-orange)' }} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>
            Pending Approval
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            Your account <strong style={{ color: '#ececec' }}>{user.email}</strong> is registered but not yet approved.
            Please contact your administrator to grant access.
          </p>
          <div style={{
            padding: '0.6rem 1rem', background: 'rgba(255, 165, 0, 0.1)',
            borderRadius: '8px', color: 'var(--accent-orange)',
            fontSize: '0.8rem', marginBottom: '2rem'
          }}>
            ⏳ Waiting for admin approval
          </div>
          <button onClick={signOut} style={{
            padding: '0.7rem 1.5rem', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <DataProvider>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <div style={{ width: 32, height: 32, background: 'var(--accent-cyan)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>AH</div>
            <span>AHASS <span className="text-cyan">CTRL</span></span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
            <div>
              <div className="panel-subtitle" style={{ fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase' }}>OVERVIEW</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#"
                  onClick={() => setActiveTab('overview')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'overview' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                  <LayoutDashboard size={18} /> Dashboard
                </a>
                <a href="#"
                  onClick={() => setActiveTab('revenue')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'revenue' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                  <TrendingUp size={18} /> Revenue Trend
                </a>
                <a href="#"
                  onClick={() => setActiveTab('intel')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'intel' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                  <Users size={18} /> Customer Intel
                </a>
              </div>
            </div>

            <div>
              <div className="panel-subtitle" style={{ fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase' }}>OPERATIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  <Briefcase size={18} /> Service Orders
                </a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  <Wrench size={18} /> Parts & Materials
                </a>
                <a href="#"
                  onClick={() => setActiveTab('staff')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'staff' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                  <UserCircle size={18} /> Staff Performance
                </a>
              </div>
            </div>

            <div>
              <div className="panel-subtitle" style={{ fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase' }}>SETTINGS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isAdmin && (
                  <a href="#"
                    onClick={() => setActiveTab('admin')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'admin' ? 'var(--accent-purple)' : 'var(--text-muted)', textDecoration: 'none' }}>
                    <Shield size={18} /> Admin Panel
                  </a>
                )}
                <a href="#"
                  onClick={() => setActiveTab('upload')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'upload' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                  <Upload size={18} /> Data Upload
                </a>
              </div>
            </div>
          </nav>

          {/* User info + Logout at bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px',
                background: isAdmin ? 'rgba(170, 80, 255, 0.15)' : 'rgba(0, 242, 254, 0.1)',
                color: isAdmin ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                fontWeight: 600
              }}>
                {isAdmin ? '👑 Admin' : 'User'}
              </span>
              <button onClick={signOut} style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', padding: '0.3rem', display: 'flex', alignItems: 'center'
              }} title="Sign out">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {activeTab !== 'revenue' && activeTab !== 'staff' && activeTab !== 'admin' && (
            <header className="top-header">
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Workshop Performance <span className="text-cyan">_</span></h1>
                <p className="panel-subtitle">AHASS CTRL - Operational Intelligence Dashboard</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--accent-green)', borderRadius: '50%' }}></div>
                  LIVE
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Last sync: Just now
                </div>
              </div>
            </header>
          )}

          {activeTab === 'overview' && (
            <>
              <KpiCards />
              <div className="charts-grid">
                <OperationalTrends />
                <FinancialFlow />
              </div>
              <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <ServiceMix />
                <ResourcePerformance />
                <PartsFavorites />
              </div>
            </>
          )}

          {activeTab === 'intel' && <CustomerIntelDashboard />}
          {activeTab === 'revenue' && <RevenueDashboard />}
          {activeTab === 'staff' && <StaffPerformanceDashboard />}
          {activeTab === 'upload' && <DataUpload />}
          {activeTab === 'admin' && <AdminPanel />}
        </main>
      </div>
    </DataProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
