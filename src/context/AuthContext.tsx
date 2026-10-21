import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Profile } from '../types/database';

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: Profile = {
  id: 'user-123',
  email: 'demo@houseofwear.com',
  phone: '+919876543210',
  full_name: 'Arjun Sharma',
  avatar_url: null,
  role: 'customer',
  loyalty_points: 2450,
  is_active: true,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
};

// Mock admin user for demo
const mockAdminUser: Profile = {
  id: 'admin-123',
  email: 'admin@houseofwear.com',
  phone: '+919876543211',
  full_name: 'Admin User',
  avatar_url: null,
  role: 'admin',
  loyalty_points: 0,
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingLogin, setPendingLogin] = useState<{ type: 'email' | 'phone'; value: string } | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('how_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('how_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 800));
    setPendingLogin({ type: 'email', value: email });
    console.log(`📧 OTP sent to ${email}: 123456 (demo)`);
  };

  const loginWithPhone = async (phone: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setPendingLogin({ type: 'phone', value: phone });
    console.log(`📱 OTP sent to +91${phone}: 123456 (demo)`);
  };

  const loginWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Default to customer for Google login
    const googleUser = { ...mockUser, full_name: 'Arjun Sharma' };
    setUser(googleUser);
    localStorage.setItem('how_user', JSON.stringify(googleUser));
  };

  const verifyOTP = async (otp: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Demo OTP is always 123456
    if (otp === '123456') {
      const email = pendingLogin?.type === 'email' ? pendingLogin.value : mockUser.email;
      const phone = pendingLogin?.type === 'phone' ? `+91${pendingLogin.value}` : mockUser.phone;
      
      // Check if admin email
      const isAdmin = email === 'admin@houseofwear.com';
      const baseUser = isAdmin ? mockAdminUser : mockUser;
      
      const newUser = {
        ...baseUser,
        email,
        phone,
      };
      setUser(newUser);
      localStorage.setItem('how_user', JSON.stringify(newUser));
      setPendingLogin(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('how_user');
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (user) {
      const updated = { ...user, ...updates, updated_at: new Date().toISOString() };
      setUser(updated);
      localStorage.setItem('how_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithPhone,
        loginWithGoogle,
        verifyOTP,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
