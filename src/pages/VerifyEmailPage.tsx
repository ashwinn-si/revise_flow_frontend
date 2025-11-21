import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const response = await apiService.post('/auth/verify-email', { token });

        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message || 'Email verified successfully!');

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(response.data.error || 'Email verification failed');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(
          error.response?.data?.error ||
          'Email verification failed. Please try again.'
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">T</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="mt-2 text-text-secondary">Email Verification</p>
        </div>

        {/* Verification Card */}
        <div className="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl">
          <div className="text-center">
            {status === 'loading' && (
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl">
                  <Loader className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-text-primary">
                    Verifying your email
                  </h2>
                  <p className="text-text-secondary">
                    Please wait while we verify your email address...
                  </p>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-2xl">
                  <CheckCircle className="w-8 h-8 text-secondary-600" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-text-primary">
                    Email Verified Successfully!
                  </h2>
                  <p className="text-text-secondary">{message}</p>
                  <p className="text-sm text-text-tertiary">
                    You'll be redirected to the login page automatically...
                  </p>
                </div>
                <Link
                  to="/login"
                  className="inline-block bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Continue to Login
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-error/10 rounded-2xl">
                  <XCircle className="w-8 h-8 text-accent-error" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-text-primary">
                    Verification Failed
                  </h2>
                  <p className="text-text-secondary">{message}</p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/signup"
                    className="block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                  >
                    Try Signing Up Again
                  </Link>
                  <Link
                    to="/login"
                    className="block text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;