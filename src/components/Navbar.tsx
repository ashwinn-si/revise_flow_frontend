import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface NavbarProps {
  showAuthButtons?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showAuthButtons = true }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/verify-email'].some(
    path => location.pathname.includes(path)
  );

  return (
    <nav className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-border/50 dark:border-border-dark/50 shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <Logo size="small" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              Revise Flow
            </h1>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-3">
            {user ? (
              // Authenticated user navigation
              <>
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                      {user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-text-tertiary dark:text-text-dark-tertiary">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Link
                    to="/settings"
                    className="p-2.5 text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-secondary dark:hover:bg-background-dark-secondary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    title="Settings"
                  >
                    <Settings size={20} />
                  </Link>

                  <button
                    onClick={logout}
                    className="p-2.5 text-text-secondary dark:text-text-dark-secondary hover:text-accent-error hover:bg-accent-error/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-error/20"
                    title="Sign out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              // Guest navigation
              showAuthButtons && !isAuthPage && (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2.5 text-text-primary dark:text-text-dark-primary hover:text-primary-600 dark:hover:text-primary-400 hover:bg-background-secondary dark:hover:bg-background-dark-secondary rounded-xl transition-all duration-200 font-medium"
                  >
                    <LogIn size={18} />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg font-medium"
                  >
                    <UserPlus size={18} />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </div>
              )
            )}

            {/* Auth page navigation */}
            {isAuthPage && !user && (
              <div className="flex items-center space-x-2">
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="px-4 py-2.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link
                    to="/signup"
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg font-medium"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;