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
};

// Fallback files for local dev when data isn't in Supabase yet
const FALLBACK_FILES = {
    dashboard: '/data/dashboard_data.json',
    advanced: '/data/advanced_dashboard_data.json',
    revenue: '/data/revenue_dashboard_data.json',
    customerIntel: '/data/customer_intel_data.json',
    staffPerformance: '/data/staff_performance_data.json',
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

    useEffect(() => {
        const loadAll = async () => {
            const loaded = {};

            for (const [key, dbKey] of Object.entries(DATASET_KEYS)) {
                try {
                    // Try Supabase first
                    const { data, error } = await supabase
                        .from('dashboard_data')
                        .select('data')
                        .eq('key', dbKey)
                        .single();

                    if (!error && data?.data) {
                        loaded[key] = data.data;
                        continue;
                    }
                } catch {
                    // Supabase not available, fall through
                }

                // Fallback: static JSON files (for dev or if Supabase data not yet uploaded)
                try {
                    const res = await fetch(FALLBACK_FILES[key]);
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

    // Upload handler: update state + persist to Supabase
    const updateDataset = useCallback(async (key, data) => {
        if (!DATASET_KEYS[key]) {
            console.error(`Unknown dataset key: ${key}`);
            return;
        }
        setDatasets(prev => ({ ...prev, [key]: data }));

        // Upsert to Supabase
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

    // Reset a single dataset back to Supabase (or fallback)
    const resetDataset = useCallback(async (key) => {
        if (!DATASET_KEYS[key]) return;
        try {
            const { data, error } = await supabase
                .from('dashboard_data')
                .select('data')
                .eq('key', DATASET_KEYS[key])
                .single();

            if (!error && data?.data) {
                setDatasets(prev => ({ ...prev, [key]: data.data }));
                return;
            }
        } catch { /* fallback */ }

        try {
            const res = await fetch(FALLBACK_FILES[key]);
            if (res.ok) {
                const d = await res.json();
                setDatasets(prev => ({ ...prev, [key]: d }));
            }
        } catch (err) {
            console.warn(`Could not reset ${key}:`, err);
        }
    }, []);

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
