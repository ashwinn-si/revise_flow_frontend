import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const TopNav: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-surface/80 backdrop-blur-sm border-b border-border/50 shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Logo size="small" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              reviseFlow
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-text-tertiary">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Link
                to="/settings"
                className="p-2.5 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                title="Settings"
              >
                <Settings size={20} />
              </Link>

              <button
                onClick={logout}
                className="p-2.5 text-text-secondary hover:text-accent-error hover:bg-accent-error/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-error/20"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;