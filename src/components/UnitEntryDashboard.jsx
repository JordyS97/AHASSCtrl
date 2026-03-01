import React, { useState, useEffect, useRef, useMemo } from 'react';
import './UnitEntryDashboard.css';

// ── REFERENCE DATA ──
const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const totals = [1100, 1160, 1280, 1340, 1270, 1380, 1420, 1460, 1520, 1580, 1610, 1670];
const groups = [420, 450, 510, 538, 502, 558, 584, 604, 630, 660, 672, 696];
const regs = totals.map((v, i) => v - groups[i]);

const saData = [
    { n: 'Budi Santoso', ue: 3744, g: 1728, r: 2016, prev: 3165 },
    { n: 'Rina Kartika', ue: 3312, g: 1456, r: 1856, prev: 2940 },
    { n: 'Doni Pratama', ue: 2976, g: 1248, r: 1728, prev: 2698 },
    { n: 'Sari Dewi', ue: 2688, g: 1024, r: 1664, prev: 2456 },
    { n: 'Agus Wijaya', ue: 2304, g: 860, r: 1444, prev: 2152 },
    { n: 'Hani Nugraha', ue: 2016, g: 728, r: 1288, prev: 1890 },
    { n: 'Fadli Rahman', ue: 1680, g: 560, r: 1120, prev: 1580 },
    { n: 'Yudi Setiawan', ue: 1410, g: 420, r: 990, prev: 1340 },
];

const mecData = [
    { n: 'Ahmad Wahyu', ue: 1642, t: 42, q: 99.1, prev: 1430 },
    { n: 'Dedi Santoso', ue: 1584, t: 44, q: 98.6, prev: 1392 },
    { n: 'Rendi Kurnia', ue: 1512, t: 45, q: 98.2, prev: 1348 },
    { n: 'Hendra Putra', ue: 1440, t: 46, q: 97.8, prev: 1302 },
    { n: 'Slamet Purnomo', ue: 1368, t: 48, q: 97.4, prev: 1240 },
    { n: 'Bayu Wicaksono', ue: 1296, t: 50, q: 97.0, prev: 1188 },
    { n: 'Teguh Hartono', ue: 1224, t: 51, q: 96.6, prev: 1132 },
    { n: 'Irwan Riyadi', ue: 1152, t: 53, q: 96.2, prev: 1068 },
    { n: 'Didik Nurhadi', ue: 1080, t: 55, q: 95.8, prev: 1010 },
    { n: 'Pandu Rizky', ue: 1008, t: 57, q: 95.2, prev: 952 },
    { n: 'Yanto Haryadi', ue: 936, t: 60, q: 94.6, prev: 886 },
    { n: 'Krisna Susanto', ue: 864, t: 63, q: 93.8, prev: 822 },
];

const groupAccts = [
    { n: 'PT Sumber Alfaria Trijaya', short: 'SAT', sec: 'Retail', ue: 580, prev: 420 },
    { n: 'BRI Cab. Bandung Timur', short: 'BRI', sec: 'Banking', ue: 492, prev: 368 },
    { n: 'PT Mitra Bisnis Madani', short: 'MBM', sec: 'Finance', ue: 386, prev: 310 },
    { n: 'BTPNS Kantor Area Bdg', short: 'BTP', sec: 'Banking', ue: 312, prev: 258 },
    { n: 'PT Indomarco Prismatama', short: 'IND', sec: 'Retail', ue: 296, prev: 240 },
    { n: 'CV Karya Mandiri Sejahtera', short: 'KMS', sec: 'Logistic', ue: 224, prev: 198 },
    { n: 'PT Jaya Abadi Nusantara', short: 'JAN', sec: 'Services', ue: 198, prev: 162 },
    { n: 'PT Global Transindo', short: 'GTI', sec: 'Transport', ue: 184, prev: 155 },
    { n: 'PT Mandiri Logistics', short: 'ML', sec: 'Logistic', ue: 162, prev: 140 },
    { n: 'BPJS Kesehatan Bandung', short: 'BPJ', sec: 'Gov', ue: 148, prev: 116 },
    { n: 'PT Telkomsel Area Bdg', short: 'TEL', sec: 'Telco', ue: 138, prev: 112 },
    { n: 'Koperasi Karyawan BRI', short: 'KKB', sec: 'Coop', ue: 118, prev: 98 },
];

const serviceTypes = [
    { n: 'Periodic Service', ue: 7396, g: 2820, r: 4576, c: 'var(--emerald)' },
    { n: 'General Repair', ue: 4931, g: 2210, r: 2721, c: 'var(--blue)' },
    { n: 'Spare Parts', ue: 1849, g: 680, r: 1169, c: 'var(--violet)' },
    { n: 'Body Repair', ue: 924, g: 560, r: 364, c: 'var(--amber)' },
    { n: 'Recall/Warranty', ue: 308, g: 220, r: 88, c: 'var(--rose)' },
];

const motorModels = [
    { n: 'BeAT Series', code: 'K56', ue: 4256, g: 980, r: 3276 },
    { n: 'Vario 125', code: 'JFZ', ue: 3108, g: 1240, r: 1868 },
    { n: 'Scoopy', code: 'K93', ue: 2360, g: 620, r: 1740 },
    { n: 'PCX 160', code: 'KF3', ue: 1764, g: 812, r: 952 },
    { n: 'CB150R', code: 'K45', ue: 1120, g: 590, r: 530 },
    { n: 'Vario 150', code: 'KB5', ue: 980, g: 480, r: 500 },
    { n: 'ADV 160', code: 'KF5', ue: 768, g: 396, r: 372 },
    { n: 'CRF150L', code: 'MD3', ue: 524, g: 198, r: 326 },
    { n: 'Genio', code: 'JB3', ue: 420, g: 124, r: 296 },
    { n: 'Others', code: '—', ue: 108, g: 50, r: 58 },
];

const hourData = [
    { h: '08', v: 180 }, { h: '09', v: 420 }, { h: '10', v: 620 }, { h: '11', v: 580 },
    { h: '12', v: 280 }, { h: '13', v: 360 }, { h: '14', v: 520 }, { h: '15', v: 490 },
    { h: '16', v: 380 }, { h: '17', v: 160 }
];

const walkIn = [640, 672, 742, 776, 732, 800, 822, 846, 880, 916, 932, 966];
const booking = [320, 346, 384, 402, 384, 420, 434, 448, 468, 488, 504, 528];
const fleet = [140, 142, 154, 162, 154, 160, 164, 166, 172, 176, 174, 176];

const records = [
    { pkb: 'PKB-2412-1842', dt: '2024-12-28', name: 'PT Sumber Alfaria Trijaya', sa: 'Budi Santoso', mec: 'Ahmad Wahyu', type: 'Periodic Service', motor: 'BeAT 2022', km: 12840, rev: 580000 },
    { pkb: 'PKB-2412-1838', dt: '2024-12-27', name: 'Budi Hartono', sa: 'Rina Kartika', mec: 'Dedi Santoso', type: 'General Repair', motor: 'Vario 125 2021', km: 18200, rev: 920000 },
    { pkb: 'PKB-2412-1830', dt: '2024-12-26', name: 'BRI Cab. Bandung Timur', sa: 'Doni Pratama', mec: 'Rendi Kurnia', type: 'Periodic Service', motor: 'Vario 125 2022', km: 9400, rev: 580000 },
    { pkb: 'PKB-2412-1824', dt: '2024-12-26', name: 'Siti Rahayu', sa: 'Sari Dewi', mec: 'Hendra Putra', type: 'Spare Parts', motor: 'Scoopy 2021', km: 14500, rev: 380000 },
    { pkb: 'PKB-2412-1819', dt: '2024-12-25', name: 'PT Mitra Bisnis Madani', sa: 'Budi Santoso', mec: 'Ahmad Wahyu', type: 'Periodic Service', motor: 'PCX 160 2023', km: 7200, rev: 620000 },
    { pkb: 'PKB-2412-1810', dt: '2024-12-24', name: 'Ahmad Fauzi', sa: 'Agus Wijaya', mec: 'Slamet Purnomo', type: 'Body Repair', motor: 'CB150R 2022', km: 22100, rev: 1450000 },
    { pkb: 'PKB-2412-1802', dt: '2024-12-23', name: 'BTPNS Kantor Pusat Bdg', sa: 'Rina Kartika', mec: 'Dedi Santoso', type: 'Periodic Service', motor: 'BeAT 2021', km: 11800, rev: 560000 },
    { pkb: 'PKB-2412-1798', dt: '2024-12-23', name: 'Dewi Lestari', sa: 'Hani Nugraha', mec: 'Bayu Wicaksono', type: 'Periodic Service', motor: 'Scoopy 2022', km: 8600, rev: 540000 },
    { pkb: 'PKB-2412-1791', dt: '2024-12-22', name: 'PT Indomarco Prismatama', sa: 'Doni Pratama', mec: 'Rendi Kurnia', type: 'General Repair', motor: 'Vario 150 2021', km: 26400, rev: 1120000 },
    { pkb: 'PKB-2412-1784', dt: '2024-12-22', name: 'Firmansyah', sa: 'Fadli Rahman', mec: 'Teguh Hartono', type: 'Periodic Service', motor: 'BeAT 2022', km: 6200, rev: 520000 },
    { pkb: 'PKB-2412-1776', dt: '2024-12-21', name: 'CV Karya Mandiri Sejahtera', sa: 'Budi Santoso', mec: 'Ahmad Wahyu', type: 'Periodic Service', motor: 'Vario 125 2023', km: 4800, rev: 560000 },
    { pkb: 'PKB-2412-1770', dt: '2024-12-21', name: 'Nurul Hidayah', sa: 'Sari Dewi', mec: 'Hendra Putra', type: 'Spare Parts', motor: 'BeAT 2021', km: 15900, rev: 340000 },
    { pkb: 'PKB-2412-1762', dt: '2024-12-20', name: 'PT Global Transindo', sa: 'Rina Kartika', mec: 'Dedi Santoso', type: 'General Repair', motor: 'ADV 160 2023', km: 32000, rev: 1380000 },
    { pkb: 'PKB-2412-1754', dt: '2024-12-20', name: 'Rizky Pratama', sa: 'Agus Wijaya', mec: 'Irwan Riyadi', type: 'Periodic Service', motor: 'PCX 160 2022', km: 9100, rev: 620000 },
    { pkb: 'PKB-2412-1748', dt: '2024-12-19', name: 'BPJS Kesehatan Bandung', sa: 'Budi Santoso', mec: 'Ahmad Wahyu', type: 'Periodic Service', motor: 'BeAT 2022', km: 5400, rev: 540000 },
    { pkb: 'PKB-2412-1742', dt: '2024-12-19', name: 'Wulandari', sa: 'Hani Nugraha', mec: 'Slamet Purnomo', type: 'General Repair', motor: 'Scoopy 2021', km: 20800, rev: 780000 },
    { pkb: 'PKB-2412-1736', dt: '2024-12-18', name: 'PT Mandiri Logistics', sa: 'Doni Pratama', mec: 'Rendi Kurnia', type: 'Periodic Service', motor: 'Vario 125 2022', km: 8900, rev: 580000 },
    { pkb: 'PKB-2412-1730', dt: '2024-12-18', name: 'Hendra Susilo', sa: 'Fadli Rahman', mec: 'Didik Nurhadi', type: 'Spare Parts', motor: 'CB150R 2021', km: 18400, rev: 420000 },
    { pkb: 'PKB-2412-1724', dt: '2024-12-17', name: 'PT Telkomsel Area Bandung', sa: 'Rina Kartika', mec: 'Dedi Santoso', type: 'Periodic Service', motor: 'BeAT 2023', km: 3200, rev: 540000 },
    { pkb: 'PKB-2412-1718', dt: '2024-12-17', name: 'Suparman', sa: 'Yudi Setiawan', mec: 'Krisna Susanto', type: 'General Repair', motor: 'Vario 150 2020', km: 28600, rev: 960000 },
];

const GROUP_PATTERNS = [
    /^pt\s/i, /^cv\s/i, /\bpt\b/i, /\bcv\b/i,
    /^bri\b/i, /\bbri\b/i, /^btpn/i, /\bbtpn/i,
    /^sumber\s/i, /^mitra\s/i, /^indomaret/i, /^alfaria/i,
    /^bpjs/i, /\bbpjs\b/i, /^bank\s/i, /\bbank\b/i,
    /\btbk\b/i, /^koperasi/i, /^telkomsel/i, /^mandiri/i,
    /^jaya\s/i, /^global\s/i, /^karya\s/i, /^abadi\s/i,
    /^nusantara/i, /^transindo/i, /^logistik/i, /^logistic/i,
    /\bkaryawan\b/i, /\bpersero\b/i, /\bgrup\b/i, /\bgroup\b/i,
];

function isGroup(name) {
    return GROUP_PATTERNS.some(p => p.test(name));
}

records.forEach(r => { r.seg = isGroup(r.name) ? 'Group' : 'Regular'; });

// ── SPARKLINE COMPONENT ──────────────────────────────────
const Sparkline = ({ data, color, width = 160, height = 30 }) => {
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
    const [currentTime, setCurrentTime] = useState('--:--:--');
    const [trendGran, setTrendGran] = useState('monthly');
    const [activeSeg, setActiveSeg] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [animating, setAnimating] = useState(false);

    // Tooltip state
    const [ttState, setTtState] = useState({ show: false, text: '', x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Trigger initial animation for bars
        setTimeout(() => setAnimating(true), 120);
    }, []);

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

    // Derived states
    const filteredRecords = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return records.filter(r =>
            r.name.toLowerCase().includes(q) ||
            r.pkb.toLowerCase().includes(q) ||
            r.sa.toLowerCase().includes(q) ||
            r.motor.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    // Trend calculations
    const trendData = useMemo(() => {
        let labels, tot, grp, reg;
        if (trendGran === 'quarterly') {
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            const qsum = (arr, q) => arr.slice(q * 3, (q + 1) * 3).reduce((a, b) => a + b, 0);
            tot = [0, 1, 2, 3].map(q => qsum(totals, q));
            grp = [0, 1, 2, 3].map(q => qsum(groups, q));
            reg = tot.map((v, i) => v - grp[i]);
        } else {
            labels = MO; tot = totals; grp = groups; reg = regs;
        }
        return { labels, tot, grp, reg };
    }, [trendGran]);

    const renderTrendChart = () => {
        const { labels, tot, grp, reg } = trendData;
        const W = 1100, H = 210, PL = 40, PR = 16, PT = 16, PB = 24;
        const cw = W - PL - PR, ch = H - PT - PB;
        const maxV = Math.max(...tot) * 1.10;

        const toX = i => PL + (i / (labels.length - 1)) * cw;
        const toY = v => PT + ch - (v / maxV) * ch;

        const gridVals = [0, 400, 800, 1200, 1600];

        const mkArea = (arr, color, op) => {
            const pts = arr.map((_, i) => `${toX(i)},${toY(arr[i])}`).join(' ');
            return <polygon points={`${PL},${PT + ch} ${pts} ${W - PR},${PT + ch}`} fill={color} opacity={op} key={`area-${color}`} />;
        };

        const mkLine = (arr, color, dash = 'none', w = 2) => {
            const pts = arr.map((_, i) => `${toX(i)},${toY(arr[i])}`).join(' ');
            return <polyline points={pts} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} key={`line-${color}`} />;
        };

        const bw = Math.max(8, (cw / labels.length) * 0.35);

        return (
            <svg className="trend-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
                {gridVals.map(v => {
                    const y = toY(v);
                    return (
                        <g key={`grid-${v}`}>
                            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e4e9f5" strokeWidth={v === 0 ? 1.5 : .8} strokeDasharray={v === 0 ? '' : '4 4'} />
                            <text x={PL - 5} y={y + 3.5} textAnchor="end" fill="#c1c9db" fontSize="9" fontFamily="DM Mono">{v >= 1000 ? (v / 1000) + 'K' : v}</text>
                        </g>
                    );
                })}

                {mkArea(tot, 'rgba(59,91,219,.10)', 1)}
                {mkArea(grp, 'rgba(109,40,217,.10)', 1)}

                {labels.map((_, i) => {
                    const bh = (tot[i] / maxV) * ch;
                    return <rect key={`bar-${i}`} x={toX(i) - bw / 2} y={PT + ch - bh} width={bw} height={bh} fill="rgba(59,91,219,.05)" rx="2" />;
                })}

                {mkLine(tot, '#3b5bdb')}
                {mkLine(grp, '#6d28d9', '6 3')}
                {mkLine(reg, '#0d9488', '3 2', 1.5)}

                {labels.map((l, i) => {
                    const x = toX(i), y = toY(tot[i]);
                    const isPeak = tot[i] === Math.max(...tot);
                    return (
                        <g key={`point-${i}`}>
                            <circle cx={x} cy={y} r={isPeak ? 5 : 3.5} fill="#3b5bdb" stroke="#fff" strokeWidth={isPeak ? 2 : 1.5}
                                data-tt={`${l}: ${tot[i].toLocaleString()} total · ${grp[i]?.toLocaleString() ?? ''} Group · ${reg[i]?.toLocaleString() ?? ''} Regular`} style={{ cursor: 'pointer' }} />
                            <text x={x} y={H - 4} textAnchor="middle" fill="#c1c9db" fontSize="9" fontFamily="DM Mono">{l}</text>
                            {isPeak && (
                                <g>
                                    <line x1={x} y1={y + 7} x2={x} y2={PT + ch} stroke="#3b5bdb" strokeWidth="1" strokeDasharray="3 3" opacity=".3" />
                                    <rect x={x - 32} y={y - 20} width="64" height="15" rx="4" fill="#3b5bdb" />
                                    <text x={x} y={y - 10} textAnchor="middle" fill="#fff" fontSize="9" fontFamily="DM Mono" fontWeight="500">PEAK {tot[i].toLocaleString()}</text>
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="ue-dashboard" onMouseMove={handleMouseMove} style={{ '--tt-x': `${ttState.x}px`, '--tt-y': `${ttState.y}px` }}>
            {/* Tooltip rendering */}
            <div className={`tt ${ttState.show ? 'show' : ''}`} style={{ left: ttState.x - 120, top: ttState.y - 40, transform: `translate(0, -100%)` }}>
                {ttState.text}
            </div>

            {/* FILTER RIBBON */}
            <div className="filters">
                <span className="fl">Filters</span>

                <select className="fsel" defaultValue="">
                    <option value="">All CM SAP</option>
                    <option value="WS-00142">WS-00142 · Bandung Timur</option>
                </select>

                <input type="date" className="finput" defaultValue="2024-01-01" />
                <span style={{ fontSize: '11px', color: 'var(--text-m)', fontWeight: 500 }}>to</span>
                <input type="date" className="finput" defaultValue="2024-12-31" />

                <div className="fsep"></div>

                <div className="seg-grp">
                    <button className={`seg-btn ${activeSeg === 'all' ? 'sa' : ''}`} onClick={() => setActiveSeg('all')}>All</button>
                    <button className={`seg-btn ${activeSeg === 'group' ? 'sg' : ''}`} onClick={() => setActiveSeg('group')}>🏢 Group</button>
                    <button className={`seg-btn ${activeSeg === 'regular' ? 'sr' : ''}`} onClick={() => setActiveSeg('regular')}>👤 Regular</button>
                </div>

                <span className="freset" onClick={() => setActiveSeg('all')}>✕ Reset</span>

                <div className="fresult">
                    Showing <strong>15,408</strong> unit entries
                </div>
            </div>

            {/* PAGE BODY */}
            <div className="page">

                {/* KPI ROW */}
                <div className="kpi-row">
                    <div className="kpi fu" style={{ '--kc': 'var(--blue)' }}>
                        <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--blue),#60a5fa)' }}></div>
                        <div className="kpi-top">
                            <div className="kpi-icon-wrap" style={{ background: 'var(--blue-lt)' }}>🔧</div>
                            <div className="kpi-delta up">↑ +12.4%</div>
                        </div>
                        <div className="kpi-label">Total Unit Entry</div>
                        <div className="kpi-value">15,408<sub> UE</sub></div>
                        <div className="kpi-meta">vs 13,709 in 2023 · +1,699 net new</div>
                        <Sparkline data={totals} color="#3b5bdb" />
                    </div>

                    <div className="kpi fu" style={{ '--kc': 'var(--violet)' }}>
                        <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--violet),#a78bfa)' }}></div>
                        <div className="kpi-top">
                            <div className="kpi-icon-wrap" style={{ background: 'var(--violet-lt)' }}>🏢</div>
                            <div className="kpi-delta up">↑ +31.2%</div>
                        </div>
                        <div className="kpi-label">Group / Corporate UE</div>
                        <div className="kpi-value" style={{ color: 'var(--violet)' }}>6,490<sub> UE</sub></div>
                        <div className="kpi-meta">42.1% of total · 412 accounts active</div>
                        <Sparkline data={groups} color="#6d28d9" />
                    </div>

                    <div className="kpi fu" style={{ '--kc': 'var(--emerald)' }}>
                        <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--emerald),#34d399)' }}></div>
                        <div className="kpi-top">
                            <div className="kpi-icon-wrap" style={{ background: 'var(--emerald-lt)' }}>👤</div>
                            <div className="kpi-delta up">↑ +8.7%</div>
                        </div>
                        <div className="kpi-label">Regular Customer UE</div>
                        <div className="kpi-value" style={{ color: 'var(--emerald)' }}>8,918<sub> UE</sub></div>
                        <div className="kpi-meta">57.9% of total · 4,408 unique customers</div>
                        <Sparkline data={regs} color="#0d9488" />
                    </div>

                    <div className="kpi fu" style={{ '--kc': 'var(--amber)' }}>
                        <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--amber),#fbbf24)' }}></div>
                        <div className="kpi-top">
                            <div className="kpi-icon-wrap" style={{ background: 'var(--amber-lt)' }}>⭐</div>
                            <div className="kpi-delta up">↑ +18.2%</div>
                        </div>
                        <div className="kpi-label">Top SA — Unit Entry</div>
                        <div className="kpi-value" style={{ fontSize: '17px', marginTop: '2px', letterSpacing: '-.3px' }}>Budi Santoso</div>
                        <div className="kpi-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 500, color: 'var(--amber)' }}>3,744 UE</span>
                            <span>· 24.3% team share</span>
                        </div>
                        <Sparkline data={[265, 280, 302, 320, 298, 340, 355, 365, 380, 395, 405, 420]} color="#b45309" />
                    </div>

                    <div className="kpi fu" style={{ '--kc': 'var(--teal)' }}>
                        <div className="kpi-accent" style={{ background: 'linear-gradient(90deg,var(--teal),#22d3ee)' }}></div>
                        <div className="kpi-top">
                            <div className="kpi-icon-wrap" style={{ background: 'var(--teal-lt)' }}>🔩</div>
                            <div className="kpi-delta up">↑ +14.8%</div>
                        </div>
                        <div className="kpi-label">Top Mechanic — Unit Entry</div>
                        <div className="kpi-value" style={{ fontSize: '17px', marginTop: '2px', letterSpacing: '-.3px' }}>Ahmad Wahyu</div>
                        <div className="kpi-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 500, color: 'var(--teal)' }}>1,642 UE</span>
                            <span>· 10.7% total share</span>
                        </div>
                        <Sparkline data={[116, 123, 135, 142, 125, 150, 156, 160, 166, 170, 174, 180]} color="#0e7490" />
                    </div>
                </div>

                {/* MAIN TREND */}
                <div className="ue-card">
                    <div className="card-head">
                        <div>
                            <div className="card-title">Unit Entry Trend — 2024</div>
                            <div className="card-sub">Monthly volume · Total, Group / Corporate, and Regular customers · hover bars for detail</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <select className="fsel" value={trendGran} onChange={(e) => setTrendGran(e.target.value)} style={{ minWidth: '100px', fontSize: '11px' }}>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                            </select>
                            <div className="tag tag-blue">TREND</div>
                        </div>
                    </div>
                    <div className="trend-area">
                        {renderTrendChart()}
                    </div>
                    <div className="legend">
                        <div className="leg-item"><div className="leg-pill" style={{ background: 'var(--blue)' }}></div>Total UE</div>
                        <div className="leg-item"><div className="leg-pill" style={{ background: 'var(--violet)' }}></div>Group / Corporate</div>
                        <div className="leg-item"><div className="leg-pill" style={{ background: 'var(--emerald)' }}></div>Regular</div>
                        <div className="leg-item" style={{ marginLeft: 'auto', fontFamily: "'DM Mono',monospace", fontSize: '10px' }}>
                            Peak month: <strong style={{ color: 'var(--ink)' }}>Dec 2024 · 1,670 UE</strong>
                        </div>
                        <div className="leg-item" style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px' }}>
                            YTD growth: <strong style={{ color: 'var(--emerald)' }}>+52% (Jan→Dec)</strong>
                        </div>
                    </div>
                </div>

                {/* SEGMENT SPLIT + GROUP COMPANIES */}
                <div className="g13">
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Monthly Split — Group vs Regular</div>
                                <div className="card-sub">Stacked UE per month · proportion view</div>
                            </div>
                            <div className="tag tag-grp">SEGMENT</div>
                        </div>
                        <div>
                            {MO.map((m, i) => {
                                const maxV = Math.max(...totals);
                                const gPct = Math.round(groups[i] / maxV * 100);
                                const rPct = Math.round(regs[i] / maxV * 100);
                                return (
                                    <div className="sbar-row" key={m}>
                                        <div className="sbar-label">{m}</div>
                                        <div className="sbar-track" data-tt={`${m}: ${totals[i].toLocaleString()} total (Group ${groups[i].toLocaleString()} + Regular ${regs[i].toLocaleString()})`}>
                                            <div className="sbar-seg" style={{ background: '#6d28d9', opacity: .82, width: animating ? `${gPct}%` : '0%' }}></div>
                                            <div className="sbar-seg" style={{ background: '#3b5bdb', opacity: .55, width: animating ? `${rPct}%` : '0%' }}></div>
                                        </div>
                                        <div className="sbar-total">{totals[i].toLocaleString()}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ paddingTop: '14px', borderTop: '1.5px solid var(--bd)', marginTop: '14px' }}>
                            <div className="donut-row">
                                <svg width="96" height="96" viewBox="0 0 96 96" style={{ flexShrink: 0 }}>
                                    <circle cx="48" cy="48" r="38" fill="none" stroke="#edf0f8" strokeWidth="13" />
                                    <circle cx="48" cy="48" r="38" fill="none" stroke="#6d28d9" strokeWidth="13" strokeDasharray={`${2 * Math.PI * 38 * (6490 / 15408)} ${2 * Math.PI * 38}`} strokeDashoffset={2 * Math.PI * 38 * .25} strokeLinecap="butt" />
                                    <circle cx="48" cy="48" r="38" fill="none" stroke="#3b5bdb" strokeWidth="13" opacity=".65" strokeDasharray={`${2 * Math.PI * 38 * (1 - 6490 / 15408)} ${2 * Math.PI * 38 * (6490 / 15408)}`} strokeDashoffset={2 * Math.PI * 38 * .25 - 2 * Math.PI * 38 * (6490 / 15408)} strokeLinecap="butt" />
                                    <text x="48" y="44" textAnchor="middle" fill="#111827" fontSize="12" fontFamily="Sora" fontWeight="800">15,408</text>
                                    <text x="48" y="58" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="DM Mono">Total UE</text>
                                </svg>

                                <div className="dleg">
                                    <div className="dleg-item">
                                        <div className="dleg-sq" style={{ background: 'var(--violet)' }}></div>
                                        <div className="dleg-lbl">Group / Corporate</div>
                                        <div className="dleg-val" style={{ color: 'var(--violet)' }}>6,490</div>
                                        <div className="dleg-pct">42.1%</div>
                                    </div>
                                    <div className="dleg-item">
                                        <div className="dleg-sq" style={{ background: 'var(--blue)' }}></div>
                                        <div className="dleg-lbl">Regular Retail</div>
                                        <div className="dleg-val" style={{ color: 'var(--blue)' }}>8,918</div>
                                        <div className="dleg-pct">57.9%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Top Group / Corporate Accounts</div>
                                <div className="card-sub">Auto-detected from NAMA PEMILIK — institutional naming patterns</div>
                            </div>
                            <div className="tag tag-grp">GROUP</div>
                        </div>
                        <div>
                            {groupAccts.map((a, i) => {
                                const d = Math.round((a.ue - a.prev) / a.prev * 100);
                                return (
                                    <div className="grp-row" key={a.n} data-tt={`${a.n} · ${a.sec} · ${a.ue} UE · YoY: +${d}%`}>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: 'var(--text-d)', width: '16px', flexShrink: 0, textAlign: 'right' }}>{i + 1}</div>
                                        <div className="grp-av">{a.short.charAt(0)}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div className="grp-name">{a.n}</div>
                                            <div className="grp-sub">{a.sec}</div>
                                        </div>
                                        <div className="grp-n">{a.ue}</div>
                                        <div className={`badge ${d > 0 ? 'bdup' : 'bddn'}`} style={{ minWidth: '46px', justifyContent: 'center' }}>{d > 0 ? '↑+' : '↓'}{Math.abs(d)}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SA + MECHANIC RANKINGS */}
                <div className="g2">
                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">SA Unit Entry Ranking</div>
                                <div className="card-sub">Annual UE + Group / Regular split + YoY change</div>
                            </div>
                            <div className="tag tag-amber">SA</div>
                        </div>
                        <div>
                            {saData.map((s, i) => {
                                const mx = saData[0].ue;
                                const pct = Math.round(s.ue / mx * 100);
                                const gp = Math.round(s.g / s.ue * 100);
                                const d = Math.round((s.ue - s.prev) / s.prev * 100);
                                const rc = ['#f59e0b', '#94a3b8', '#b45309'];
                                return (
                                    <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 0', borderBottom: '1px solid var(--surface3)' }}>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '13px', fontWeight: 500, color: i < 3 ? rc[i] : '#c1c9db', width: '18px', flexShrink: 0 }}>{i + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>{s.n}</div>
                                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '12px', fontWeight: 500 }}>{s.ue.toLocaleString()}</span>
                                                    <span className={`badge ${d >= 0 ? 'bdup' : 'bddn'}`}>{d >= 0 ? '↑+' : '↓'}{Math.abs(d)}%</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', height: '7px', background: 'var(--surface3)', borderRadius: '4px', overflow: 'hidden', gap: '1px' }} data-tt={`${s.n}: Group ${s.g.toLocaleString()} (${gp}%) · Regular ${s.r.toLocaleString()} (${100 - gp}%)`}>
                                                <div style={{ background: '#6d28d9', opacity: .8, width: animating ? `${gp * pct / 100}%` : '0%', transition: 'width .8s cubic-bezier(.4,0,.2,1)', borderRadius: '4px 0 0 4px' }}></div>
                                                <div style={{ background: '#3b5bdb', opacity: .6, width: animating ? `${(100 - gp) * pct / 100}%` : '0%', transition: 'width .8s cubic-bezier(.4,0,.2,1)', borderRadius: '0 4px 4px 0' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="ue-card">
                        <div className="card-head">
                            <div>
                                <div className="card-title">Mechanic Unit Entry Ranking</div>
                                <div className="card-sub">Annual UE + avg service time + quality score</div>
                            </div>
                            <div className="tag tag-teal">MECHANIC</div>
                        </div>
                        <div>
                            {mecData.map((m, i) => {
                                const mx = mecData[0].ue;
                                const pct = Math.round(m.ue / mx * 100);
                                const qc = m.q >= 98 ? '#059669' : m.q >= 96.5 ? '#0e7490' : '#b45309';
                                const d = Math.round((m.ue - m.prev) / m.prev * 100);
                                const rc = ['#f59e0b', '#94a3b8', '#b45309'];
                                return (
                                    <div key={m.n} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 0', borderBottom: '1px solid var(--surface3)' }}>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '13px', fontWeight: 500, color: i < 3 ? rc[i] : '#c1c9db', width: '18px', flexShrink: 0 }}>{i + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink)' }}>{m.n}</div>
                                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', fontWeight: 500 }}>{m.ue.toLocaleString()}</span>
                                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '9px', padding: '2px 5px', borderRadius: '4px', background: 'var(--surface3)', color: qc }}>Q:{m.q}%</span>
                                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '9px', color: 'var(--text-m)' }}>{m.t}m</span>
                                                </div>
                                            </div>
                                            <div style={{ height: '5px', background: 'var(--surface3)', borderRadius: '3px', overflow: 'hidden' }} data-tt={`${m.n}: ${m.ue.toLocaleString()} UE · ${m.t}min avg · ${m.q}% quality`}>
                                                <div style={{ background: 'linear-gradient(90deg,#0e7490,#22d3ee)', borderRadius: '3px', width: animating ? `${pct}%` : '0%', height: '100%', transition: 'width .8s cubic-bezier(.4,0,.2,1)' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div style={{ height: '2rem' }}></div>
            </div>
        </div>
    );
};

export default UnitEntryDashboard;
