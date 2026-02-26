import React, { useState, useRef, useCallback } from 'react';
import { useData } from '../DataContext';
import { Upload, CheckCircle, XCircle, RotateCcw, FileJson, Trash2 } from 'lucide-react';

const UPLOAD_SLOTS = [
    {
        key: 'advanced',
        label: 'Overview Dashboard',
        description: 'advanced_dashboard_data.json',
        color: 'var(--accent-cyan)',
        icon: '◈',
        requiredKeys: ['kpis', 'segmentation']
    },
    {
        key: 'revenue',
        label: 'Revenue Trend',
        description: 'revenue_dashboard_data.json',
        color: 'var(--accent-green)',
        icon: '↗',
        requiredKeys: ['workshops', 'monthlyData']
    },
    {
        key: 'customerIntel',
        label: 'Customer Intel',
        description: 'customer_intel_data.json',
        color: 'var(--accent-purple)',
        icon: '◎',
        requiredKeys: ['kpis', 'rfm_matrix']
    },
    {
        key: 'staffPerformance',
        label: 'Staff Performance',
        description: 'staff_performance_data.json',
        color: '#FFB800',
        icon: '⚙',
        requiredKeys: ['service_advisors', 'mechanics']
    }
];

const UploadSlot = ({ slot, currentData, onUpload, onReset }) => {
    const [dragOver, setDragOver] = useState(false);
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    const hasData = !!currentData;

    const processFile = useCallback((file) => {
        if (!file.name.endsWith('.json')) {
            setStatus('error');
            setErrorMsg('Only .json files are accepted');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate structure
                const missingKeys = slot.requiredKeys.filter(k => !(k in data));
                if (missingKeys.length > 0) {
                    setStatus('error');
                    setErrorMsg(`Missing keys: ${missingKeys.join(', ')}`);
                    return;
                }

                onUpload(slot.key, data);
                setStatus('success');
                setErrorMsg('');
            } catch (err) {
                setStatus('error');
                setErrorMsg('Invalid JSON format');
            }
        };
        reader.readAsText(file);
    }, [slot, onUpload]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
    const handleDragLeave = () => setDragOver(false);

    const handleBrowse = () => fileInputRef.current?.click();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) processFile(file);
        e.target.value = '';
    };

    const handleReset = () => {
        onReset(slot.key);
        setStatus(null);
        setErrorMsg('');
    };

    return (
        <div
            className="glass-panel"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
                padding: '2rem',
                borderColor: dragOver ? slot.color : status === 'success' ? 'var(--accent-green)' : status === 'error' ? '#FF4444' : 'var(--panel-border)',
                borderWidth: dragOver ? '2px' : '1px',
                borderStyle: dragOver ? 'dashed' : 'solid',
                background: dragOver ? `rgba(${slot.color === 'var(--accent-cyan)' ? '0,242,254' : slot.color === 'var(--accent-green)' ? '0,200,100' : slot.color === 'var(--accent-purple)' ? '168,85,247' : '255,184,0'}, 0.05)` : undefined,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '220px',
                gap: '1rem'
            }}
            onClick={handleBrowse}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* Status badge */}
            {hasData && (
                <div style={{
                    position: 'absolute', top: '0.8rem', right: '0.8rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(0,200,100,0.15)', padding: '0.3rem 0.7rem', borderRadius: '20px',
                    fontSize: '0.7rem', color: 'var(--accent-green)'
                }}>
                    <CheckCircle size={12} /> Loaded
                </div>
            )}

            {/* Icon */}
            <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `rgba(${slot.color === 'var(--accent-cyan)' ? '0,242,254' : slot.color === 'var(--accent-green)' ? '0,200,100' : slot.color === 'var(--accent-purple)' ? '168,85,247' : '255,184,0'}, 0.15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', color: slot.color
            }}>
                {status === 'success' ? <CheckCircle size={24} /> : status === 'error' ? <XCircle size={24} color="#FF4444" /> : <Upload size={24} />}
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: slot.color, letterSpacing: '0.5px' }}>
                    {slot.icon} {slot.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
                    <FileJson size={12} /> {slot.description}
                </div>
            </div>

            {/* Drag/Browse instruction */}
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                {dragOver ? (
                    <span style={{ color: slot.color, fontWeight: 600 }}>Drop file here</span>
                ) : (
                    <>Drag \u0026 drop or <span style={{ color: slot.color, textDecoration: 'underline' }}>browse</span></>
                )}
            </div>

            {/* Error message */}
            {status === 'error' && (
                <div style={{
                    fontSize: '0.75rem', color: '#FF4444',
                    background: 'rgba(255,68,68,0.1)', padding: '0.4rem 0.8rem', borderRadius: '4px',
                    display: 'flex', alignItems: 'center', gap: '0.3rem'
                }}>
                    <XCircle size={12} /> {errorMsg}
                </div>
            )}

            {/* Reset button */}
            {hasData && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleReset(); }}
                    style={{
                        position: 'absolute', bottom: '0.8rem', right: '0.8rem',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)',
                        color: 'var(--text-muted)', padding: '0.3rem 0.6rem', borderRadius: '4px',
                        cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem',
                        transition: '0.2s'
                    }}
                >
                    <RotateCcw size={10} /> Reset
                </button>
            )}
        </div>
    );
};

const DataUpload = () => {
    const { datasets, updateDataset, resetDataset, resetAll } = useData();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', letterSpacing: '1px', fontWeight: 800 }}>
                        Data <span className="text-cyan">Upload</span>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Upload JSON files to update dashboard visualizations
                    </p>
                </div>
                <button
                    onClick={resetAll}
                    style={{
                        background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)',
                        color: '#FF6B6B', padding: '0.6rem 1.2rem', borderRadius: '6px',
                        cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                        transition: '0.2s', fontWeight: 600
                    }}
                >
                    <Trash2 size={14} /> Reset All Data
                </button>
            </div>

            {/* Info banner */}
            <div className="glass-panel" style={{
                padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                borderLeft: '3px solid var(--accent-cyan)'
            }}>
                <div style={{ fontSize: '1.2rem' }}>💡</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Upload the JSON files generated by <code style={{ color: 'var(--accent-cyan)', background: 'rgba(0,242,254,0.1)', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>process_data.py</code> to instantly update all dashboard visualizations. Data persists across browser sessions via local storage.
                </div>
            </div>

            {/* Upload Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
            }}>
                {UPLOAD_SLOTS.map(slot => (
                    <UploadSlot
                        key={slot.key}
                        slot={slot}
                        currentData={datasets[slot.key]}
                        onUpload={updateDataset}
                        onReset={resetDataset}
                    />
                ))}
            </div>

            {/* Status summary */}
            <div className="glass-panel" style={{ padding: '1.2rem 1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
                    Dataset Status
                </div>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {UPLOAD_SLOTS.map(slot => (
                        <div key={slot.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: datasets[slot.key] ? 'var(--accent-green)' : 'rgba(255,255,255,0.2)'
                            }} />
                            <span style={{ fontSize: '0.8rem', color: datasets[slot.key] ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                {slot.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DataUpload;
