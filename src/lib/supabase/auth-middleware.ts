// ============================================
// House Of Wear - Auth State Middleware
// For React Router (Vite SPA)
// ============================================

import { supabase } from './client';
import type { Profile } from '../../types/database';

// ============================================
// Auth State Manager
// ============================================

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; email: string } | null;
  profile: Profile | null;
};

type AuthListener = (state: AuthState) => void;

class AuthManager {
  private state: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    profile: null,
  };
  
  private listeners: Set<AuthListener> = new Set();

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await this.loadProfile(session.user.id);
        this.setState({
          isAuthenticated: true,
          isLoading: false,
          user: { id: session.user.id, email: session.user.email || '' },
        });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.setState({ isLoading: false });
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadProfile(session.user.id);
        this.setState({
          isAuthenticated: true,
          isLoading: false,
          user: { id: session.user.id, email: session.user.email || '' },
        });
      } else if (event === 'SIGNED_OUT') {
        this.setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          profile: null,
        });
      }
    });
  }

  private async loadProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        this.setState({ profile: data as Profile });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }

  private setState(updates: Partial<AuthState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  async refreshProfile() {
    if (this.state.user) {
      await this.loadProfile(this.state.user.id);
    }
  }
}

export const authManager = new AuthManager();

// ============================================
// Protected Route Guard
// ============================================

export function requireAuth(redirectTo: string = '/login') {
  const state = authManager.getState();
  if (!state.isAuthenticated && !state.isLoading) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

export function requireAdmin(redirectTo: string = '/') {
  const state = authManager.getState();
  if (state.profile?.role !== 'admin') {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

// ============================================
// Guest Cart Session ID
// ============================================

export function getOrCreateSessionId(): string {
  const key = 'how_session_id';
  let sessionId = localStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, sessionId);
  }
  
  return sessionId;
}
