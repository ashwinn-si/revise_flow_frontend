import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { googleAPI } from '../services/api';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [timezone, setTimezone] = useState(user?.timezone || 'UTC');
  const [loading, setLoading] = useState(false);



  const handleTimezoneChange = async (newTimezone: string) => {
    setLoading(true);
    // TODO: Implement timezone update API call
    setTimeout(() => {
      setTimezone(newTimezone);
      toast.success('Timezone updated');
      setLoading(false);
    }, 1000);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => window.history.back()}
              className="p-3 bg-surface border border-border rounded-2xl hover:bg-background-secondary transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
              <p className="mt-1 text-text-secondary">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8">
          {/* Account Section */}
          <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-xl">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary">Account Information</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text-primary">
                  Email Address
                </label>
                <div className="p-4 bg-background border border-border rounded-2xl">
                  <p className="text-text-primary font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text-primary">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => handleTimezoneChange(e.target.value)}
                  className="w-full px-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-text-primary disabled:opacity-50"
                  disabled={loading}
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/Denver">Mountain Time (US & Canada)</option>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                  <option value="Australia/Sydney">Sydney</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Section */}
          {/* <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-secondary-100 rounded-xl">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary">Security</h2>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">Two-Factor Authentication</h3>
                  <p className="text-text-secondary text-sm">Add an extra layer of security to your account with 2FA</p>
                </div>
                <button
                  onClick={handleTwoFactorToggle}
                  disabled={loading}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 ${twoFactorEnabled ? 'bg-primary-500' : 'bg-border'
                    }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          {/* <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-accent-success/10 rounded-xl">
                <svg className="w-6 h-6 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary">Integrations</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-background border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">G</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Google Calendar</h3>
                      <p className="text-text-secondary text-sm">Sync your tasks and reminders with Google Calendar</p>
                    </div>
                  </div>
                  <button
                    onClick={handleGoogleCalendarConnect}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-lg"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={logout}
              className="px-6 py-3 bg-accent-error/10 hover:bg-accent-error/20 text-accent-error font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-error/20"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;