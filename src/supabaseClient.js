import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        // Disable the Navigator LockManager to avoid 10s timeout hangs in dev
        // We use a dummy lock that resolves immediately to prevent both hangs and TypeErrors
        lock: (() => {
            const lockMock = (...args) => {
                const callback = args.find(arg => typeof arg === 'function');
                if (callback) return callback();
                return Promise.resolve();
            };
            lockMock.acquire = lockMock;
            return lockMock;
        })()
    }
});
