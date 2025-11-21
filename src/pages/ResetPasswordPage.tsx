import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { KeyRound, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const { token } = useParams<{ token: string }>();
  const { resetPassword, verifyResetToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyResetToken(token).then(result => {
        setIsTokenValid(result.success);
        if (!result.success) {
          toast.error(result.error || 'Invalid or expired reset token');
        }
      });
    } else {
      setIsTokenValid(false);
      toast.error('No reset token provided');
    }
  }, [token, verifyResetToken]);

  const validatePasswords = () => {
    if (password.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    if (!token) {
      toast.error('No reset token provided');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(token, password);

      if (result.success) {
        setIsSuccess(true);
        toast.success('Password reset successfully!');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(result.error || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isTokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-text-secondary">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-error to-red-600 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary mb-4">Invalid Reset Link</h1>
            <p className="text-text-secondary mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <div className="space-y-4">
              <Link
                to="/forgot-password"
                className="block w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Request New Reset Link
              </Link>
              <Link
                to="/login"
                className="block w-full py-3.5 px-6 bg-background border border-border text-text-primary font-medium rounded-2xl hover:bg-background-secondary transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            {isSuccess ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-success to-secondary-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-text-primary">Password Reset Complete</h1>
                <p className="text-text-secondary">
                  Your password has been successfully reset. You'll be redirected to login in a moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <KeyRound className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-text-primary">Reset Your Password</h1>
                <p className="text-text-secondary">
                  Enter your new password below. Make sure it's secure and memorable.
                </p>
              </div>
            )}
          </div>

          {isSuccess ? (
            <div className="space-y-4">
              <div className="p-4 bg-accent-success/10 border border-accent-success/20 rounded-2xl">
                <p className="text-sm text-accent-success text-center">
                  Redirecting to login page in 3 seconds...
                </p>
              </div>

              <Link
                to="/login"
                className="block w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl text-center transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Go to Login Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-12 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter new password"
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-text-tertiary mt-1">Must be at least 4 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-12 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {password && confirmPassword && password !== confirmPassword && (
                <div className="p-3 bg-accent-error/10 border border-accent-error/20 rounded-2xl">
                  <p className="text-sm text-accent-error">Passwords do not match</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-neutral-400 disabled:to-neutral-500 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-text-secondary">
                  Remember your password?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;