# Theme System Documentation

## Overview
Revise Flow now includes a comprehensive theme system that supports light mode, dark mode, and automatic system theme detection. The theme system is built using React Context and Tailwind CSS's dark mode support.

## Features

### 🎨 Theme Options
- **Light Mode**: Clean, bright interface with purple/emerald color scheme
- **Dark Mode**: Modern dark interface with adjusted colors for better contrast
- **System Mode**: Automatically follows your device's theme preference

### 🛠️ Implementation Details

#### Core Files
- `src/contexts/ThemeContext.tsx` - Theme state management and system preference detection
- `src/components/ThemeToggle.tsx` - Reusable theme switching component
- `tailwind.config.js` - Dark mode color definitions
- `src/styles/index.css` - Enhanced CSS with dark mode support
- `index.html` - FOUC prevention and initial theme detection

#### Theme Context
The `ThemeContext` provides:
- `theme`: Current theme setting ('light' | 'dark' | 'system')
- `setTheme`: Function to change theme preference
- `effectiveTheme`: The actual theme being applied ('light' | 'dark')
- Automatic localStorage persistence
- System theme change detection

### 🎯 Usage

#### Theme Toggle Component
The `ThemeToggle` component supports multiple variants:

```tsx
// Icon button (cycles through themes)
<ThemeToggle variant="icon" size="md" />

// Dropdown selector
<ThemeToggle variant="dropdown" size="md" />

// Switch with labels (recommended for settings)
<ThemeToggle variant="switch" size="md" showLabel={true} />
```

#### Using Theme in Components
```tsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, setTheme, effectiveTheme } = useTheme();
  
  return (
    <div className={`bg-background dark:bg-background-dark`}>
      Current theme: {theme}
      Effective theme: {effectiveTheme}
    </div>
  );
};
```

### 🎨 Dark Mode Color System

#### Background Colors
- `bg-background` → `dark:bg-background-dark`
- `bg-background-secondary` → `dark:bg-background-dark-secondary`
- `bg-surface` → `dark:bg-surface-dark`

#### Text Colors
- `text-text-primary` → `dark:text-text-dark-primary`
- `text-text-secondary` → `dark:text-text-dark-secondary`
- `text-text-tertiary` → `dark:text-text-dark-tertiary`

#### Border Colors
- `border-border` → `dark:border-border-dark`
- `border-border-secondary` → `dark:border-border-dark-secondary`

### 🚀 Integration Points

#### TopNav Component
- Icon-based theme toggle in the navigation bar
- Cycles through light → dark → system themes
- Visual indicator for system mode

#### Settings Page
- Dedicated theme section with switch-style toggle
- Shows labels for each theme option
- Descriptive text explaining the system option

### 📱 Browser Support

#### Features
- **localStorage persistence** - Theme preference survives browser restarts
- **System preference detection** - Respects `prefers-color-scheme` media query
- **Dynamic theme switching** - Real-time theme updates without page refresh
- **FOUC prevention** - Eliminates flash of unstyled content on page load

#### Compatibility
- Modern browsers with CSS custom properties support
- Graceful fallback for browsers without `prefers-color-scheme`
- Works with SSR/SSG (theme applied before React hydration)

### 🔧 Customization

#### Adding New Color Variants
1. Add colors to `tailwind.config.js`
2. Update CSS classes in components
3. Test in both light and dark modes

#### Creating Custom Theme Toggles
```tsx
import { useTheme } from '../contexts/ThemeContext';

const CustomToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
};
```

### 🎯 Best Practices

1. **Always use both light and dark variants** when applying color classes
2. **Test components in both themes** during development
3. **Use semantic color names** (e.g., `text-primary` instead of specific colors)
4. **Provide visual feedback** for the current theme state
5. **Consider accessibility** - ensure proper contrast in both themes

### 📋 Migration Guide

For existing components, update color classes:

```tsx
// Before
<div className="bg-white text-gray-900 border-gray-200">

// After  
<div className="bg-background dark:bg-background-dark text-text-primary dark:text-text-dark-primary border-border dark:border-border-dark">
```

The theme system is now fully integrated and ready to provide users with a personalized, accessible experience that adapts to their preferences and environment.