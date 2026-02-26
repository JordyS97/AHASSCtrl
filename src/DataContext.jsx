import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const DataContext = createContext(null);

const DATASET_KEYS = {
    dashboard: { file: '/data/dashboard_data.json', storageKey: 'ahass_dashboard' },
    advanced: { file: '/data/advanced_dashboard_data.json', storageKey: 'ahass_advanced' },
    revenue: { file: '/data/revenue_dashboard_data.json', storageKey: 'ahass_revenue' },
    customerIntel: { file: '/data/customer_intel_data.json', storageKey: 'ahass_customerIntel' },
    staffPerformance: { file: '/data/staff_performance_data.json', storageKey: 'ahass_staffPerformance' },
};

export function DataProvider({ children }) {
    const [datasets, setDatasets] = useState({
        dashboard: null,
        advanced: null,
        revenue: null,
        customerIntel: null,
        staffPerformance: null,
    });
    const [loading, setLoading] = useState(true);

    // On mount: try localStorage first, then fetch defaults
    useEffect(() => {
        const loadAll = async () => {
            const loaded = {};
            for (const [key, config] of Object.entries(DATASET_KEYS)) {
                // Check localStorage first
                const stored = localStorage.getItem(config.storageKey);
                if (stored) {
                    try {
                        loaded[key] = JSON.parse(stored);
                        continue;
                    } catch { /* fall through to fetch */ }
                }
                // Fallback: fetch from static files
                try {
                    const res = await fetch(config.file);
                    if (res.ok) {
                        loaded[key] = await res.json();
                    }
                } catch (err) {
                    console.warn(`Could not load ${key}:`, err);
                }
            }
            setDatasets(prev => ({ ...prev, ...loaded }));
            setLoading(false);
        };
        loadAll();
    }, []);

    // Upload handler: update state + persist to localStorage
    const updateDataset = useCallback((key, data) => {
        if (!DATASET_KEYS[key]) {
            console.error(`Unknown dataset key: ${key}`);
            return;
        }
        setDatasets(prev => ({ ...prev, [key]: data }));
        localStorage.setItem(DATASET_KEYS[key].storageKey, JSON.stringify(data));
    }, []);

    // Reset a single dataset back to the server default
    const resetDataset = useCallback(async (key) => {
        if (!DATASET_KEYS[key]) return;
        localStorage.removeItem(DATASET_KEYS[key].storageKey);
        try {
            const res = await fetch(DATASET_KEYS[key].file);
            if (res.ok) {
                const data = await res.json();
                setDatasets(prev => ({ ...prev, [key]: data }));
            }
        } catch (err) {
            console.warn(`Could not reset ${key}:`, err);
        }
    }, []);

    // Reset all datasets
    const resetAll = useCallback(async () => {
        for (const key of Object.keys(DATASET_KEYS)) {
            await resetDataset(key);
        }
    }, [resetDataset]);

    return (
        <DataContext.Provider value={{ datasets, loading, updateDataset, resetDataset, resetAll }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useData must be used within a DataProvider');
    return ctx;
}

export default DataContext;
