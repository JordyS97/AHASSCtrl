import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile (role, approved) from profiles table
    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            console.warn('Could not fetch profile:', error.message);
            return null;
        }
        return data;
    };

    useEffect(() => {
        let mounted = true;
        console.log('AuthContext: [1] Effect started');

        const initializeAuth = async () => {
            try {
                console.log('AuthContext: [2] Calling getSession()...');
                const { data: { session: initialSession }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('AuthContext: [!] getSession error:', error.message);
                }

                if (!mounted) return;

                console.log('AuthContext: [3] Session result:', initialSession ? 'logged in' : 'no session');
                setSession(initialSession);

                // Set loading to false immediately after session is resolved
                // We fetch profile in the background so it doesn't block the UI
                console.log('AuthContext: [6] Setting loading -> false');
                setLoading(false);

                if (initialSession?.user) {
                    console.log('AuthContext: [4] Fetching profile in background for:', initialSession.user.id);
                    fetchProfile(initialSession.user.id).then(p => {
                        if (mounted && p) {
                            console.log('AuthContext: [5] Profile background result: success');
                            setProfile(p);
                        }
                    });
                }
            } catch (err) {
                console.error('AuthContext: [!] Caught error during init:', err);
                if (mounted) setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        console.log('AuthContext: [7] Setting up auth listener');
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, s) => {
                console.log('AuthContext: [Listener] Event:', event, 'User:', s?.user?.id);
                if (!mounted) return;

                setSession(s);
                if (s?.user) {
                    const p = await fetchProfile(s.user.id);
                    if (mounted) setProfile(p);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
    };

    const isAdmin = profile?.role === 'admin';
    const isApproved = profile?.approved === true;

    return (
        <AuthContext.Provider value={{
            session,
            user: session?.user || null,
            profile,
            loading,
            isAdmin,
            isApproved,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}

export default AuthContext;
