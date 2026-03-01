import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from './supabaseClient';

const DataContext = createContext(null);

// Keys that map to the dashboard_data table
const DATASET_KEYS = {
    dashboard: 'dashboard',
    advanced: 'advanced',
    revenue: 'revenue',
    customerIntel: 'customerIntel',
    staffPerformance: 'staffPerformance',
    dailyMetrics: 'dailyMetrics',
};

// Fallback files for local dev when data isn't in Supabase yet
const FALLBACK_FILES = {
    dashboard: '/data/dashboard_data.json',
    advanced: '/data/advanced_dashboard_data.json',
    revenue: '/data/revenue_dashboard_data.json',
    customerIntel: '/data/customer_intel_data.json',
    staffPerformance: '/data/staff_performance_data.json',
    dailyMetrics: '/data/daily_metrics.json',
};

export function DataProvider({ children }) {
    const [datasets, setDatasets] = useState({
        dashboard: null,
        advanced: null,
        revenue: null,
        customerIntel: null,
        staffPerformance: null,
        dailyMetrics: null,
    });
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: '2025-01-01',
        endDate: '2025-12-31'
    });

    useEffect(() => {
        let isMounted = true;
        const loadAll = async () => {
            console.log("DataContext: Starting loadAll...");
            const loaded = {};

            for (const [key, dbKey] of Object.entries(DATASET_KEYS)) {
                try {
                    console.log(`DataContext: Fetching ${dbKey} from Supabase...`);
                    const { data: dbRows, error: dbError } = await supabase
                        .from('dashboard_data')
                        .select('data')
                        .eq('key', dbKey);

                    if (!dbError && dbRows && dbRows.length > 0) {
                        console.log(`DataContext: Loaded ${key} from Supabase`);
                        loaded[key] = dbRows[0].data;
                        continue;
                    } else if (dbError) {
                        console.warn(`DataContext: Supabase error for ${key}:`, dbError.message);
                    } else {
                        console.log(`DataContext: No Supabase data for ${key}`);
                    }
                } catch (err) {
                    console.warn(`DataContext: Supabase catch for ${key}:`, err);
                }

                // Fallback: static JSON files
                try {
                    console.log(`DataContext: Fetching local fallback for ${key}...`);
                    const res = await fetch(FALLBACK_FILES[key]);
                    if (res.ok) {
                        const d = await res.json();
                        console.log(`DataContext: Loaded ${key} from local fallback`);
                        loaded[key] = d;
                    } else {
                        console.warn(`DataContext: Local fallback missing for ${key}`);
                    }
                } catch (err) {
                    console.warn(`DataContext: Could not load ${key} locally:`, err);
                }
            }

            if (isMounted) {
                console.log("DataContext: All loads finished. Updating stats.");
                setDatasets(prev => ({ ...prev, ...loaded }));
                setLoading(false);
            }
        };

        loadAll();
        return () => { isMounted = false; };
    }, []);

    // Upload handler
    const updateDataset = useCallback(async (key, data) => {
        if (!DATASET_KEYS[key]) return;
        setDatasets(prev => ({ ...prev, [key]: data }));

        try {
            await supabase
                .from('dashboard_data')
                .upsert({
                    key: DATASET_KEYS[key],
                    data: data,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'key' });
        } catch (err) {
            console.warn(`Could not save ${key} to Supabase:`, err);
        }
    }, []);

    // Reset a single dataset
    const resetDataset = useCallback(async (key) => {
        if (!DATASET_KEYS[key]) return;
        try {
            const { data: dbRows, error: dbError } = await supabase
                .from('dashboard_data')
                .select('data')
                .eq('key', DATASET_KEYS[key]);

            if (!dbError && dbRows && dbRows.length > 0) {
                setDatasets(prev => ({ ...prev, [key]: dbRows[0].data }));
                return;
            }
        } catch { /* fallback */ }

        try {
            const res = await fetch(FALLBACK_FILES[key]);
            if (res.ok) {
                const d = await res.json();
                setDatasets(prev => ({ ...prev, [key]: d }));
            }
        } catch (err) { }
    }, []);

    const resetAll = useCallback(async () => {
        for (const key of Object.keys(DATASET_KEYS)) {
            await resetDataset(key);
        }
    }, [resetDataset]);

    // Derived filtered data
    const filteredData = React.useMemo(() => {
        if (!datasets.dailyMetrics) return [];
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return datasets.dailyMetrics.filter(item => {
            const d = new Date(item.d);
            return d >= start && d <= end;
        });
    }, [datasets.dailyMetrics, dateRange]);

    const kpis = React.useMemo(() => {
        if (filteredData.length === 0) return { revenue: 0, gp: 0, units: 0, margin: 0 };
        let rev = 0, gp = 0, units = 0;
        filteredData.forEach(i => {
            rev += i.r;
            gp += i.g;
            units += i.u;
        });
        return {
            revenue: rev / 1000000,
            gp: gp / 1000000,
            units: units,
            margin: rev > 0 ? (gp / rev * 100) : 0
        };
    }, [filteredData]);

    const dailyTrends = React.useMemo(() => {
        const groups = {};
        filteredData.forEach(i => {
            if (!groups[i.d]) groups[i.d] = { date: i.d, revenue: 0, gp: 0, units: 0 };
            groups[i.d].revenue += i.r / 1000000;
            groups[i.d].gp += i.g / 1000000;
            groups[i.d].units += i.u;
        });
        return Object.values(groups).sort((a, b) => a.date.localeCompare(b.date));
    }, [filteredData]);

    const unitEntryTrends = React.useMemo(() => {
        const months = {};
        filteredData.forEach(i => {
            const m = i.d.substring(0, 7); // YYYY-MM
            if (!months[m]) {
                const date = new Date(m + '-01');
                months[m] = { month: date.toLocaleString('default', { month: 'short', year: '20' + date.getFullYear().toString().slice(-2) }), units: 0, rawDate: m };
            }
            months[m].units += i.u;
        });
        return Object.values(months).sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    }, [filteredData]);

    return (
        <DataContext.Provider value={{
            datasets,
            loading,
            dateRange,
            setDateRange,
            kpis,
            dailyTrends,
            unitEntryTrends,
            updateDataset,
            resetDataset,
            resetAll
        }}>
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
