
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import supabase from '../utils/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UnifiedUser {
    id: string;
    email?: string;
    name?: string;
    role?: 'admin' | 'devotee';
    provider: 'firebase' | 'supabase';
    rawUser: FirebaseUser | SupabaseUser;
}

interface AuthContextType {
    user: UnifiedUser | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UnifiedUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Firebase Auth Listener
        const auth = getAuth();
        const unsubscribeFirebase = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                setUser({
                    id: fbUser.uid,
                    email: fbUser.email || undefined,
                    name: fbUser.displayName || undefined,
                    provider: 'firebase',
                    rawUser: fbUser,
                });
            } else if (user?.provider === 'firebase') {
                setUser(null);
            }
            setLoading(false);
        });

        // Supabase Auth Listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Fetch profile to get role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.full_name,
                    role: profile?.role || 'devotee',
                    provider: 'supabase',
                    rawUser: session.user,
                });
            } else if (user?.provider === 'supabase') {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeFirebase();
            subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        const auth = getAuth();
        await Promise.all([
            auth.signOut(),
            supabase.auth.signOut(),
        ]);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
