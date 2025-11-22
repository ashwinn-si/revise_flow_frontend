import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  variant?: 'default' | 'overlay' | 'inline';
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  title = 'Loading...',
  message = 'Please wait while we process your request.',
  variant = 'default'
}) => {
  if (!isOpen) return null;

  // Inline variant (no overlay)
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="relative mb-4">
            <Loader2 className="w-8 h-8 text-primary-500 dark:text-primary-400 animate-spin mx-auto" />
            <div className="absolute inset-0 rounded-full border-2 border-primary-100 dark:border-primary-900/50 animate-pulse" />
          </div>
          <p className="text-sm font-medium text-text-primary dark:text-text-dark-primary">{title}</p>
          {message && (
            <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1">{message}</p>
          )}
        </div>
      </div>
    );
  }

  // Full overlay variants
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal Content */}
      <div className="relative bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-8 shadow-2xl animate-scale-in max-w-sm w-full mx-4">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="relative mb-6">
            {/* Spinning loader */}
            <Loader2 className="w-12 h-12 text-primary-500 dark:text-primary-400 animate-spin mx-auto" />

            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary-100 dark:border-primary-900/50 animate-ping opacity-75" />

            {/* Static ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-primary-800" />
          </div>

          {/* Text Content */}
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-2">
            {title}
          </h3>

          {message && (
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
              {message}
            </p>
          )}

          {/* Progress dots animation */}
          <div className="flex justify-center items-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Button Component
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white focus:ring-primary-500/20 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white focus:ring-secondary-500/20 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500/20'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading spinner overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}

      {/* Button content with opacity control */}
      <span className={`flex items-center justify-center transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
};

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`relative ${className}`}>
      <Loader2 className={`${sizeStyles[size]} text-primary-500 dark:text-primary-400 animate-spin`} />
      <div className={`absolute inset-0 ${sizeStyles[size]} border-2 border-primary-100 dark:border-primary-900/50 rounded-full animate-pulse`} />
    </div>
  );
};

export default LoadingModal;