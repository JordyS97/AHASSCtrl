import React, { useState, useEffect, useMemo } from 'react';
import './UnitEntryDashboard.css';
import { useData } from '../DataContext';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    ScatterChart, Scatter, ZAxis, Cell, LineChart, Line
} from 'recharts';
import { Download, Search, AlertCircle, FileText, Briefcase, User, Calendar, Clock, Activity, TrendingUp } from 'lucide-react';

const Sparkline = ({ data, color, width = 160, height = 30 }) => {
    if (!data || data.length === 0) return null;
    const min = Math.min(...data);
    const max = Math.max(...data) + 1;
    const px = (v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / (max - min)) * (height - 6) - 3;
        return `${x},${y}`;
    };
    const pts = data.map((v, i) => px(v, i)).join(' ');
    const lx = width;
    const ly = height - ((data[data.length - 1] - min) / (max - min)) * (height - 6) - 3;
    const id = Math.random().toString(36).substr(2, 9);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '30px', marginTop: '8px', display: 'block' }}>
            <defs>
                <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity=".25" />
                    <stop offset="100%" stopColor={color} stopOpacity=".02" />
                </linearGradient>
            </defs>
            <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#g${id})`} />
            <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lx} cy={ly} r="2.5" fill={color} />
        </svg>
    );
};

const UnitEntryDashboard = () => {
    const { datasets, loading } = useData();
    const data = datasets?.unitEntry;

    const [currentTime, setCurrentTime] = useState('--:--:--');
    const [animating, setAnimating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [ttState, setTtState] = useState({ show: false, text: '', x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (data) {
            setTimeout(() => setAnimating(true), 120);
        }
    }, [data]);

    const handleMouseMove = (e) => {
        const target = e.target.closest('[data-tt]');
        if (target) {
            setTtState({
                show: true,
                text: target.dataset.tt,
                x: e.clientX,
                y: e.clientY
            });
        } else {
            setTtState(p => ({ ...p, show: false }));
        }
    };

    if (loading || !data) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-m)' }}>
                <Activity className="animate-spin" size={32} style={{ marginRight: '12px' }} />
                Loading Unit Entry Data...
            </div>
        );
    }

    const { kpi, sa_rankings, mechanic_rankings, heatmap, service_types, trend_table, hourly_pattern, kedatangan_trend, top_models, detailed_records } = data;

    // Filter Detail Records
    const filteredRecords = detailed_records.filter(r =>
        searchQuery === '' ||
        r.pemilik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.no_pkb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.sa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.nopol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.motor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatB = (v) => `${(v / 1000000).toFixed(2)}M`;
    const formatPct = (v) => `${(v).toFixed(1)}%`;

    // Flatten heatmap
    const hmFlat = [];
    const hmDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hmMonths = heatmap.data.map(d => d.id);
    heatmap.data.forEach((mObj, mIdx) => {
        mObj.data.forEach((dObj, dIdx) => {
            hmFlat.push({
                x: hmDays.indexOf(dObj.x),
                y: mIdx,
                z: dObj.y,
                label: `${mObj.id} ${dObj.x}`
            });
        });
    });

    return (
        <div className="ue-dashboard" onMouseMove={handleMouseMove} style={{ '--tt-x': `${ttState.x}px`, '--tt-y': `${ttState.y}px` }}>
            <div className={`tt ${ttState.show ? 'show' : ''}`} style={{ left: ttState.x - 120, top: ttState.y - 40, transform: `translate(0, -100%)` }}>
                {ttState.text}
            </div>

            {/* HEADER KPI ROW */}
            <div className="kpi-row" style={{ marginTop: '1rem', padding: '0 2rem' }}>
                <div className="kpi fu" style={{ '--kc': 'var(--blue)' }}>
                    <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--blue),#60a5fa)' }}></div>
                    <div className="kpi-top">
                        <div className="kpi-icon-wrap" style={{ background: 'var(--blue-lt)' }}><Activity size={18} color="var(--blue)" /></div>
                    </div>
                    <div className="kpi-label">Total Unit Entry</div>
                    <div className="kpi-value">{kpi.total_ue.toLocaleString()}<sub> UE</sub></div>
                    <div className="kpi-meta">YTD Volume</div>
                </div>

                <div className="kpi fu" style={{ '--kc': 'var(--emerald)' }}>
                    <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--emerald),#34d399)' }}></div>
                    <div className="kpi-top">
                        <div className="kpi-icon-wrap" style={{ background: 'var(--emerald-lt)' }}><TrendingUp size={18} color="var(--emerald)" /></div>
                    </div>
                    <div className="kpi-label">Total Revenue</div>
                    <div className="kpi-value" style={{ color: 'var(--emerald)' }}>Rp {(kpi.total_revenue / 1000000000).toFixed(2)}<sub> B</sub></div>
                    <div className="kpi-meta">Net value generation</div>
                </div>

                <div className="kpi fu" style={{ '--kc': 'var(--amber)' }}>
                    <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--amber),#fbbf24)' }}></div>
                    <div className="kpi-top">
                        <div className="kpi-icon-wrap" style={{ background: 'var(--amber-lt)' }}><Briefcase size={18} color="var(--amber)" /></div>
                    </div>
                    <div className="kpi-label">Average GP Margin</div>
                    <div className="kpi-value" style={{ color: 'var(--amber)' }}>{kpi.gp_margin.toFixed(1)}<sub> %</sub></div>
                    <div className="kpi-meta">Profitability Efficiency</div>
                </div>

                <div className="kpi fu" style={{ '--kc': 'var(--rose)' }}>
                    <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--rose),#fb7185)' }}></div>
                    <div className="kpi-top">
                        <div className="kpi-icon-wrap" style={{ background: 'var(--rose-lt)' }}><AlertCircle size={18} color="var(--rose)" /></div>
                    </div>
                    <div className="kpi-label">Total Discounts</div>
                    <div className="kpi-value" style={{ color: 'var(--rose)' }}>Rp {(kpi.total_discount / 1000000).toFixed(0)}<sub> M</sub></div>
                    <div className="kpi-meta">Total given out</div>
                </div>
            </div>

            <div className="page" style={{ paddingTop: '1rem' }}>

                {/* AUTO GENERATED INSIGHTS */}
                <div className="ue-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #f8f9fd 0%, #ffffff 100%)' }}>
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div className="tag tag-amber">AI INSIGHTS</div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Executive Summary & Actions</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600 }}>Peak Hours Critical</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-m)', marginTop: '4px' }}>Most arrivals happen between 10:00–11:00. <strong style={{ color: 'var(--blue)' }}>Action:</strong> Ensure maximum SA presence and 100% bay utilization during this window.</div>
                            </div>
                            <div style={{ borderLeft: '3px solid var(--emerald)', paddingLeft: '12px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600 }}>Group/Retail Balance</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-m)', marginTop: '4px' }}>Group accounts represent significant volume but often lower margin. <strong style={{ color: 'var(--emerald)' }}>Action:</strong> Optimize spare part bundles for fleet accounts to boost GP.</div>
                            </div>
                            <div style={{ borderLeft: '3px solid var(--violet)', paddingLeft: '12px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600 }}>Service Mix Warning</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-m)', marginTop: '4px' }}>Periodic services dominate but Heavy Repair lags. <strong style={{ color: 'var(--violet)' }}>Action:</strong> Implement 'Health Check' promos to convert routine visits to heavier mechanical jobs.</div>
                            </div>
                            <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '12px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600 }}>Weekday Distribution</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-m)', marginTop: '4px' }}>Fridays show distinct dips in several months. <strong style={{ color: 'var(--amber)' }}>Action:</strong> Create Friday-specific Booking discounts to smooth out operational load.</div>
                            </div>
                            <div style={{ borderLeft: '3px solid var(--teal)', paddingLeft: '12px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600 }}>Model Dominance</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-m)', marginTop: '4px' }}>BeAT and Vario series constitute the vast majority. <strong style={{ color: 'var(--teal)' }}>Action:</strong> Standardize fast-moving part inventory specifically tuned for K-series engines.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="g2">
                    {/* CHART 1: Arrival Channels & Hour Patterns */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Arrival Channel Trend</div>
                                <div className="card-sub">Walk-in vs Booking vs Fleet Contract volumes</div>
                            </div>
                            <div className="tag tag-blue">CHANNELS</div>
                        </div>
                        <div style={{ height: '240px', padding: '16px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={kedatangan_trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="name" fontSize={11} stroke="var(--text-d)" tickLine={false} axisLine={false} />
                                    <YAxis fontSize={11} stroke="var(--text-d)" tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                                    <Area type="monotone" dataKey="Walk-in" stackId="1" stroke="#3b5bdb" fill="#3b5bdb" fillOpacity={0.8} />
                                    <Area type="monotone" dataKey="Booking" stackId="1" stroke="#0d9488" fill="#0d9488" fillOpacity={0.8} />
                                    <Area type="monotone" dataKey="Fleet Contract" stackId="1" stroke="#6d28d9" fill="#6d28d9" fillOpacity={0.8} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Hourly Arrival Pattern</div>
                                <div className="card-sub">Aggregated Unit Entries by hour of day.</div>
                            </div>
                            <div className="tag tag-amber">HOURLY</div>
                        </div>
                        <div style={{ height: '240px', padding: '16px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourly_pattern} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="hour" fontSize={11} stroke="var(--text-d)" tickLine={false} axisLine={false} />
                                    <YAxis fontSize={11} stroke="var(--text-d)" tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="units" fill="#b45309" radius={[4, 4, 0, 0]}>
                                        {hourly_pattern.map((entry, index) => {
                                            const isPeak = entry.units === Math.max(...hourly_pattern.map(d => d.units));
                                            return <Cell key={`cell-${index}`} fill={isPeak ? '#ea580c' : '#fcd34d'} />;
                                        })}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="g2" style={{ marginTop: '1.5rem' }}>
                    {/* CHART 2: Day x Month Heatmap */}
                    <div className="ue-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-head">
                            <div>
                                <div className="card-title">Day × Month Unit Entry Matrix</div>
                                <div className="card-sub">Hotspots mapping peak activity across days & months</div>
                            </div>
                            <div className="tag tag-rose">HEATMAP</div>
                        </div>
                        <div style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center' }}>
                            <ResponsiveContainer width="100%" height={320}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                                    <XAxis type="category" dataKey="x" name="Day" interval={0} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-m)' }} allowDuplicatedCategory={false} />
                                    <YAxis type="category" dataKey="y" name="Month" tickFormatter={tick => hmMonths[tick]} interval={0} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-m)' }} reversed allowDuplicatedCategory={false} />
                                    <ZAxis type="number" dataKey="z" range={[20, 400]} name="Units" />
                                    <Tooltip
                                        cursor={{ strokeDasharray: '3 3' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const d = payload[0].payload;
                                                return (
                                                    <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--bd)', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-m)' }}>{d.label}</div>
                                                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--rose)' }}>{d.z} UE</div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Scatter data={hmFlat} fill="var(--rose)">
                                        {hmFlat.map((entry, index) => {
                                            const op = 0.2 + (entry.z / heatmap.max_val) * 0.8;
                                            return <Cell key={`cell-${index}`} fill={'var(--rose)'} fillOpacity={op} />;
                                        })}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* CHART 3: Service Type Chart */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Service Type Mix</div>
                                <div className="card-sub">Group vs Regular distribution by service type</div>
                            </div>
                            <div className="tag tag-violet">SERVICE</div>
                        </div>
                        <div style={{ height: '320px', padding: '16px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={service_types} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis type="number" fontSize={11} stroke="var(--text-d)" tickLine={false} axisLine={false} />
                                    <YAxis type="category" dataKey="name" fontSize={11} stroke="var(--text-m)" tickLine={false} axisLine={false} width={100} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="Group" stackId="a" fill="#6d28d9" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="Regular" stackId="a" fill="#3b5bdb" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="g13" style={{ marginTop: '1.5rem' }}>
                    {/* TOP TABLES */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Top 10 Motorcycle Models</div>
                                <div className="card-sub">Most frequently serviced units</div>
                            </div>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            {top_models.map((m, i) => {
                                const mx = top_models[0].value;
                                const w = (m.value / mx) * 100;
                                return (
                                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ width: '20px', fontFamily: "'DM Mono'", fontSize: '11px', color: 'var(--text-d)', textAlign: 'right' }}>{i + 1}</div>
                                        <div style={{ width: '100px', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                                        <div style={{ flex: 1, backgroundColor: 'var(--surface3)', height: '8px', borderRadius: '4px' }}>
                                            <div style={{ width: `${w}%`, backgroundColor: 'var(--teal)', height: '100%', borderRadius: '4px' }}></div>
                                        </div>
                                        <div style={{ width: '50px', fontFamily: "'DM Mono'", fontSize: '11px', textAlign: 'right' }}>{m.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* MONTHLY SUMMARY TABLE */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Monthly Summary & MoM Growth</div>
                                <div className="card-sub">Tracking month-over-month performance dynamically</div>
                            </div>
                            <div className="tag tag-grp">PERFORMANCE</div>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1.5px solid var(--bd2)', color: 'var(--text-m)' }}>
                                        <th style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 600 }}>Month</th>
                                        <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 600 }}>Unit Entry</th>
                                        <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 600 }}>UE MoM</th>
                                        <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 600 }}>Revenue</th>
                                        <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 600 }}>Rev MoM</th>
                                        <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 600 }}>GP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trend_table.map((row, i) => (
                                        <tr key={row.month} style={{ borderBottom: '1px solid var(--bd)' }}>
                                            <td style={{ padding: '10px 8px', fontWeight: 600 }}>{row.month}</td>
                                            <td style={{ textAlign: 'right', padding: '10px 8px', fontFamily: "'DM Mono'" }}>{row.unit_entry.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right', padding: '10px 8px', fontFamily: "'DM Mono'", color: row.ue_mom > 0 ? 'var(--emerald)' : row.ue_mom < 0 ? 'var(--rose)' : 'var(--text-m)' }}>
                                                {row.ue_mom > 0 ? '+' : ''}{row.ue_mom}%
                                            </td>
                                            <td style={{ textAlign: 'right', padding: '10px 8px', fontFamily: "'DM Mono'" }}>Rp {formatB(row.revenue)}</td>
                                            <td style={{ textAlign: 'right', padding: '10px 8px', fontFamily: "'DM Mono'", color: row.rev_mom > 0 ? 'var(--emerald)' : row.rev_mom < 0 ? 'var(--rose)' : 'var(--text-m)' }}>
                                                {row.rev_mom > 0 ? '+' : ''}{row.rev_mom}%
                                            </td>
                                            <td style={{ textAlign: 'right', padding: '10px 8px', fontFamily: "'DM Mono'" }}>Rp {formatB(row.gp)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="g2" style={{ marginTop: '1.5rem' }}>
                    {/* SA RANKINGS */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">SA Unit Entry Ranking</div>
                                <div className="card-sub">Annual UE + Group vs Regular composition</div>
                            </div>
                            <div className="tag tag-amber">SA</div>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            {sa_rankings.map((s, i) => {
                                const mx = sa_rankings[0].Total;
                                const pct = (s.Total / mx) * 100;
                                const gp = (s.Group / s.Total) * 100;
                                const rp = 100 - gp;
                                return (
                                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 0', borderBottom: '1px solid var(--surface3)' }}>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '13px', fontWeight: 500, color: i < 3 ? '#b45309' : '#c1c9db', width: '18px', flexShrink: 0 }}>{i + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>{s.name}</div>
                                                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '12px', fontWeight: 500 }}>{s.Total.toLocaleString()}</div>
                                            </div>
                                            <div style={{ display: 'flex', height: '7px', background: 'var(--surface3)', borderRadius: '4px', overflow: 'hidden', gap: '1px' }} data-tt={`${s.name}: Group ${s.Group} (${gp.toFixed(1)}%) · Regular ${s.Regular} (${rp.toFixed(1)}%)`}>
                                                <div style={{ background: '#6d28d9', opacity: .8, width: `${(gp / 100) * pct}%`, borderRadius: '4px 0 0 4px' }}></div>
                                                <div style={{ background: '#3b5bdb', opacity: .6, width: `${(rp / 100) * pct}%`, borderRadius: '0 4px 4px 0' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* MECHANIC RANKINGS */}
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Mechanic Unit Entry Ranking</div>
                                <div className="card-sub">Annual UE + Group vs Regular composition</div>
                            </div>
                            <div className="tag tag-teal">MECHANIC</div>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            {mechanic_rankings.map((m, i) => {
                                const mx = mechanic_rankings[0].Total;
                                const pct = (m.Total / mx) * 100;
                                const gp = (m.Group / m.Total) * 100;
                                const rp = 100 - gp;
                                return (
                                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 0', borderBottom: '1px solid var(--surface3)' }}>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '13px', fontWeight: 500, color: i < 3 ? '#0e7490' : '#c1c9db', width: '18px', flexShrink: 0 }}>{i + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>{m.name}</div>
                                                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '12px', fontWeight: 500 }}>{m.Total.toLocaleString()}</div>
                                            </div>
                                            <div style={{ display: 'flex', height: '7px', background: 'var(--surface3)', borderRadius: '4px', overflow: 'hidden', gap: '1px' }} data-tt={`${m.name}: Group ${m.Group} (${gp.toFixed(1)}%) · Regular ${m.Regular} (${rp.toFixed(1)}%)`}>
                                                <div style={{ background: '#6d28d9', opacity: .8, width: `${(gp / 100) * pct}%`, borderRadius: '4px 0 0 4px' }}></div>
                                                <div style={{ background: '#3b5bdb', opacity: .6, width: `${(rp / 100) * pct}%`, borderRadius: '0 4px 4px 0' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* DETAILED SERVICE RECORDS (Latest 500) */}
                <div className="ue-card" style={{ marginTop: '1.5rem' }}>
                    <div className="card-head" style={{ borderBottom: '1px solid var(--bd)', paddingBottom: '16px', marginBottom: 0 }}>
                        <div>
                            <div className="card-title">Service Details Log</div>
                            <div className="card-sub">Top 500 most recent service entries. Auto-classified Customer Class.</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-m)' }} />
                                <input
                                    type="text"
                                    placeholder="Search by name, PKB, motor, SA..."
                                    style={{ padding: '7px 10px 7px 30px', border: '1px solid var(--bd2)', borderRadius: '6px', fontSize: '12px', width: '250px' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button style={{ padding: '7px 14px', background: 'var(--surface)', border: '1px solid var(--bd2)', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <Download size={14} /> Export CSV
                            </button>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                            <thead style={{ position: 'sticky', top: 0, background: 'var(--surface2)', zIndex: 1, boxShadow: '0 1px 0 var(--bd2)' }}>
                                <tr style={{ color: 'var(--text-m)' }}>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>No. PKB</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Nopol</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Customer Name</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Class</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Motor</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Service Advisor</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Mechanic</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length > 0 ? filteredRecords.map((r, i) => (
                                    <tr key={`${r.no_pkb}-${i}`} style={{ borderBottom: '1px solid var(--bd)', background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface2)' }}>
                                        <td style={{ padding: '10px 16px', fontFamily: "'DM Mono'", color: 'var(--text)' }}>
                                            {new Date(r.tgl).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }).replace('/', '-')}
                                        </td>
                                        <td style={{ padding: '10px 16px', fontFamily: "'DM Mono'", fontWeight: 500, color: 'var(--blue)' }}>{r.no_pkb}</td>
                                        <td style={{ padding: '10px 16px', fontFamily: "'DM Mono'" }}>{r.nopol}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: 500 }}>{r.pemilik}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{
                                                display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                                                background: r.customer_class === 'Group' ? 'var(--violet-lt)' : 'var(--emerald-lt)',
                                                color: r.customer_class === 'Group' ? 'var(--violet)' : 'var(--emerald)',
                                            }}>
                                                {r.customer_class}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 16px', color: 'var(--text-m)' }}>{r.motor}</td>
                                        <td style={{ padding: '10px 16px' }}>{r.sa}</td>
                                        <td style={{ padding: '10px 16px' }}>{r.mekanik}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: "'DM Mono'", fontWeight: 500 }}>
                                            Rp {r.revenue.toLocaleString()}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={9} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-m)' }}>
                                            No records found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ height: '2rem' }}></div>
            </div>
        </div>
    );
};

export default UnitEntryDashboard;
