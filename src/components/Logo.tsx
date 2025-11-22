import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-2xl w-8 h-8',
    medium: 'text-4xl w-12 h-12',
    large: 'text-6xl w-16 h-16'
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800
          text-transparent bg-clip-text
          font-black
          flex items-center justify-center
          drop-shadow-lg
        `}
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontWeight: 900,
          lineHeight: 1
        }}
      >
        F
      </div>
    </div>
  );
};

export default Logo;