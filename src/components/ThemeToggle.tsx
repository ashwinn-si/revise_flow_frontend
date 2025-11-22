import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  size = 'md',
  showLabel = false
}) => {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = iconSizes[size];

  const getThemeIcon = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return <Sun size={iconSize} />;
      case 'dark':
        return <Moon size={iconSize} />;
      case 'system':
        return <Monitor size={iconSize} />;
    }
  };

  const getThemeLabel = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  if (variant === 'icon') {
    const toggleTheme = () => {
      const themes: Theme[] = ['light', 'dark', 'system'];
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
    };

    return (
      <button
        onClick={toggleTheme}
        className={`
          relative p-2.5 
          text-text-secondary hover:text-text-primary 
          hover:bg-background-secondary dark:hover:bg-background-dark-secondary
          rounded-xl transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-primary-500/20
          ${effectiveTheme === 'dark' ? 'dark:text-text-dark-secondary dark:hover:text-text-dark-primary' : ''}
        `}
        title={`Theme: ${getThemeLabel(theme)}`}
        aria-label={`Switch theme (current: ${getThemeLabel(theme)})`}
      >
        {getThemeIcon(theme)}
        {theme === 'system' && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-primary-500 rounded-full border border-background dark:border-background-dark"></div>
        )}
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className={`
            appearance-none px-3 py-2 pr-8
            bg-background dark:bg-background-dark
            border border-border dark:border-border-dark
            rounded-xl text-sm
            text-text-primary dark:text-text-dark-primary
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 
            focus:border-primary-500 transition-all duration-200
            ${size === 'sm' ? 'text-xs px-2 py-1.5' : ''}
            ${size === 'lg' ? 'text-base px-4 py-3' : ''}
          `}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-text-tertiary dark:text-text-dark-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'switch') {
    const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
      { value: 'light', label: 'Light', icon: <Sun size={16} /> },
      { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
      { value: 'system', label: 'System', icon: <Monitor size={16} /> },
    ];

    return (
      <div className="flex items-center space-x-1 p-1 bg-background-secondary dark:bg-background-dark-secondary rounded-xl border border-border dark:border-border-dark">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${theme === themeOption.value
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background dark:hover:bg-background-dark'
              }
            `}
          >
            {themeOption.icon}
            {showLabel && <span>{themeOption.label}</span>}
          </button>
        ))}
      </div>
    );
  }

  return null;
};

export default ThemeToggle;