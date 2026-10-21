// ============================================
// House Of Wear - Supabase Auth Helpers
// ============================================

import { supabase } from './client';
import type { Profile } from '../../types/database';

// ============================================
// AUTH: Send OTP to email
// ============================================

export async function sendEmailOTP(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Verify email OTP
// ============================================

export async function verifyEmailOTP(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Send OTP to phone
// ============================================

export async function sendPhoneOTP(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: `+91${phone}`,
  });
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Verify phone OTP
// ============================================

export async function verifyPhoneOTP(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: `+91${phone}`,
    token,
    type: 'sms',
  });
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Google Sign In
// ============================================

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Update profile
// ============================================

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Get user profile
// ============================================

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================
// AUTH: Check if user is admin
// ============================================

export async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  
  if (error) return false;
  return data?.role === 'admin';
}

// ============================================
// AUTH: Listen to auth state changes
// ============================================

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
