import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      toast.error('Password must be at least 4 characters long');
      setLoading(false);
      return;
    }

    const result = await signup(email, password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } else {
      toast.error(result.error || 'Signup failed');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <>
        <Navbar showAuthButtons={false} />
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-secondary-50 via-background to-primary-50 dark:from-secondary-950/30 dark:via-background-dark dark:to-primary-950/30 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-8 shadow-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-3">Account Created Successfully!</h2>
              <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                We've sent a verification email to your inbox. Please check your email and click the verification link to complete your account setup.
              </p>
              <div className="text-sm text-text-tertiary dark:text-text-dark-tertiary">
                Redirecting to login in a few seconds...
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-secondary-50 via-background to-primary-50 dark:from-secondary-950/30 dark:via-background-dark dark:to-primary-950/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Join Revise Flow
              </h1>
              <p className="mt-2 text-text-secondary dark:text-text-dark-secondary">Create your account and start organizing</p>
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
                    className="w-full px-4 py-3.5 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 dark:focus:ring-secondary-400/30 dark:focus:border-secondary-400 transition-all duration-200 text-text-primary dark:text-text-dark-primary placeholder-text-tertiary dark:placeholder-text-dark-tertiary"
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 dark:focus:ring-secondary-400/30 dark:focus:border-secondary-400 transition-all duration-200 text-text-primary dark:text-text-dark-primary placeholder-text-tertiary dark:placeholder-text-dark-tertiary"
                    placeholder="Create a strong password"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 dark:focus:ring-secondary-400/30 dark:focus:border-secondary-400 transition-all duration-200 text-text-primary dark:text-text-dark-primary placeholder-text-tertiary dark:placeholder-text-dark-tertiary"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;