import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { OTPInput } from './OTPInput';
import { useAuth } from '../../context/AuthContext';
import { twMerge } from '../../utils/cn';

type LoginStep = 'method' | 'otp';
type LoginMethod = 'email' | 'phone';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithPhone, loginWithGoogle, verifyOTP } = useAuth();
  
  const [step, setStep] = useState<LoginStep>('method');
  const [method, setMethod] = useState<LoginMethod>('email');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(false);

  const redirectTo = (location.state as any)?.from?.pathname || '/';

  const handleSendOTP = async () => {
    if (!value.trim()) {
      setError(method === 'email' ? 'Please enter your email' : 'Please enter your phone number');
      return;
    }

    if (method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address');
      return;
    }

    if (method === 'phone' && !/^\d{10}$/.test(value)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (method === 'email') {
        await login(value);
      } else {
        await loginWithPhone(value);
      }
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    setOtpError(false);

    try {
      const success = await verifyOTP(otp);
      if (success) {
        navigate(redirectTo, { replace: true });
      } else {
        setOtpError(true);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('method');
    setValue('');
    setError('');
    setOtpError(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            {step === 'method' ? 'Welcome' : 'Verify OTP'}
          </h1>
          <p className="text-sm text-brand-600 dark:text-brand-400">
            {step === 'method'
              ? 'Sign in to access your account'
              : `Enter the 6-digit code sent to ${method === 'email' ? value : `+91 ${value}`}`}
          </p>
        </div>

        {/* Content */}
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 sm:p-8">
          {step === 'method' ? (
            <>
              {/* Method Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => { setMethod('email'); setValue(''); setError(''); }}
                  className={twMerge(
                    'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all',
                    method === 'email'
                      ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
                      : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
                  )}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => { setMethod('phone'); setValue(''); setError(''); }}
                  className={twMerge(
                    'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all',
                    method === 'phone'
                      ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
                      : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
                  )}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
              </div>

              {/* Input */}
              <div className="space-y-4">
                <Input
                  type={method === 'email' ? 'email' : 'tel'}
                  label={method === 'email' ? 'Email Address' : 'Phone Number'}
                  placeholder={method === 'email' ? 'you@example.com' : '9876543210'}
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(''); }}
                  error={error}
                  leftIcon={method === 'email' ? <Mail className="w-4 h-4" /> : <span className="text-xs font-medium">+91</span>}
                />

                <Button onClick={handleSendOTP} loading={loading} fullWidth size="lg">
                  Send OTP
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-200 dark:border-brand-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white dark:bg-brand-950 text-brand-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                fullWidth
                size="lg"
                loading={loading}
                leftIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                }
              >
                Sign in with Google
              </Button>

              {/* Demo Hint */}
              <div className="mt-6 p-3 bg-brand-50 dark:bg-brand-900 rounded-lg text-xs text-brand-600 dark:text-brand-400 text-center">
                <p className="font-medium mb-1">Demo Mode</p>
                <p>Use any email/phone and enter OTP: <code className="font-mono font-bold">123456</code></p>
              </div>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="space-y-6">
                <OTPInput
                  onComplete={handleVerifyOTP}
                  disabled={loading}
                  error={otpError}
                />

                {otpError && (
                  <p className="text-center text-sm text-red-600 dark:text-red-400">
                    Invalid OTP. Please try again.
                  </p>
                )}

                {error && (
                  <p className="text-center text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}

                <Button onClick={handleBack} variant="ghost" fullWidth leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Change {method === 'email' ? 'Email' : 'Phone'}
                </Button>

                <p className="text-center text-xs text-brand-500 dark:text-brand-400">
                  Didn't receive the code? <button className="underline font-medium">Resend OTP</button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-brand-500 dark:text-brand-400 mt-6">
          By signing in, you agree to our{' '}
          <a href="/terms" className="underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
