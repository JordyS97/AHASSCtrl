import React, { useState } from 'react';
import './index.css';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  PieChart,
  Map,
  Briefcase,
  Wrench,
  UserCircle
} from 'lucide-react';

// Placeholders for widgets we'll build next
import KpiCards from './components/KpiCards';
import FinancialFlow from './components/FinancialFlow';
import OperationalTrends from './components/OperationalTrends';
import ServiceMix from './components/ServiceMix';
import ResourcePerformance from './components/ResourcePerformance';
import PartsFavorites from './components/PartsFavorites';

// New Customer Segment Expansion Widgets
import RevenueSegmentation from './components/RevenueSegmentation';
import VisitBehavior from './components/VisitBehavior';
import SpendingPattern from './components/SpendingPattern';
import MotorcycleProfile from './components/MotorcycleProfile';
import RetentionLoyalty from './components/RetentionLoyalty';
import GeographyMap from './components/GeographyMap';
import StaffAllocation from './components/StaffAllocation';

// Revenue Trend Expansion
import RevenueDashboard from './components/RevenueDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div style={{ width: 32, height: 32, background: 'var(--accent-cyan)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>AH</div>
          <span>AHASS <span className="text-cyan">CTRL</span></span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                onClick={() => setActiveTab('segments')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: activeTab === 'segments' ? 'var(--accent-cyan)' : 'var(--text-muted)', textDecoration: 'none' }}>
                <Users size={18} /> Advanced Segments
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
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                <UserCircle size={18} /> Staff Performance
              </a>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab !== 'revenue' && (
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
            {/* Row 1: KPIs */}
            <KpiCards />

            {/* Row 2: Charts and Flows */}
            <div className="charts-grid">
              <OperationalTrends />
              <FinancialFlow />
            </div>

            {/* Row 3: Mix and Resources */}
            <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <ServiceMix />
              <ResourcePerformance />
              <PartsFavorites />
            </div>
          </>
        )}

        {activeTab === 'segments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}>Customer Segment Intelligence</h2>
              <p className="text-muted">Analyzing operational footprints: Regular vs Group / Corporate Fleets.</p>
            </div>

            <RevenueSegmentation />
            <VisitBehavior />

            <div className="charts-grid">
              <SpendingPattern />
              <MotorcycleProfile />
            </div>

            <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <RetentionLoyalty />
              <GeographyMap />
              <StaffAllocation />
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <RevenueDashboard />
        )}

      </main>
    </div>
  );
}

export default App;
