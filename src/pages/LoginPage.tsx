import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import TwoStepModal from '../components/TwoStepModal';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Login successful, user will be redirected by AuthProvider
    } else if (result.requiresTwoFactor) {
      setShowTwoFactor(true);
    } else {
      toast.error(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleTwoFactorClose = () => {
    setShowTwoFactor(false);
  };

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-950/30 dark:via-background-dark dark:to-secondary-950/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <p className="mt-2 text-text-secondary dark:text-text-dark-secondary">Sign in to continue to Revise Flow</p>
              {useAuth().user && (
                <div className="mt-4">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 font-medium transition-colors duration-200"
                  >
                    ← Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-primary-400/30 dark:focus:border-primary-400 transition-all duration-200 text-text-primary dark:text-text-dark-primary placeholder-text-tertiary dark:placeholder-text-dark-tertiary"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-primary-400/30 dark:focus:border-primary-400 transition-all duration-200 text-text-primary dark:text-text-dark-primary placeholder-text-tertiary dark:placeholder-text-dark-tertiary"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors duration-200"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {showTwoFactor && (
          <TwoStepModal
            onClose={handleTwoFactorClose}
            onSuccess={handleTwoFactorClose}
          />
        )}
      </div>
    </>
  );
};

export default LoginPage;