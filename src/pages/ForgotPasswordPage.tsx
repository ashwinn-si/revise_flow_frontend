import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        setIsEmailSent(true);
        toast.success('Password reset email sent successfully!');
      } else {
        toast.error(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        {/* Back to Login Link */}
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-text-secondary hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            {isEmailSent ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-success to-secondary-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-text-primary">Check Your Email</h1>
                <p className="text-text-secondary">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-text-primary">Forgot Password?</h1>
                <p className="text-text-secondary">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
            )}
          </div>

          {isEmailSent ? (
            <div className="space-y-6">
              <div className="p-4 bg-accent-success/10 border border-accent-success/20 rounded-2xl">
                <p className="text-sm text-accent-success text-center">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  className="w-full py-3.5 px-6 bg-background border border-border text-text-primary font-medium rounded-2xl hover:bg-background-secondary transition-all duration-200"
                >
                  Try Different Email
                </button>

                <Link
                  to="/login"
                  className="block w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl text-center transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-neutral-400 disabled:to-neutral-500 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending Email...
                  </div>
                ) : (
                  'Send Reset Link'
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

export default ForgotPasswordPage;