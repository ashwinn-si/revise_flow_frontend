# RevisionFlow Client

**Frontend React application for the RevisionFlow spaced revision learning platform**

RevisionFlow Client is a modern, responsive React application built with TypeScript, Vite, and Tailwind CSS. It provides an intuitive interface for managing learning tasks and implementing spaced repetition techniques for optimal knowledge retention.

## 🚀 Features

### 🎯 Core Functionality
- **Spaced Revision System**: Visual task management with automatic revision scheduling
- **Calendar Navigation**: Intuitive day-by-day view with task organization
- **Task Management**: Create, edit, delete, and archive learning tasks
- **Progress Tracking**: Visual completion indicators and learning statistics
- **Smart Scheduling**: Automatic revision reminders based on spaced repetition

### 🔐 Authentication & Security
- **JWT Authentication**: Secure login with access and refresh tokens
- **Two-Factor Authentication**: Email-based 2FA for enhanced security
- **Password Management**: Secure password reset and recovery
- **Session Management**: Automatic token refresh and logout
- **Protected Routes**: Role-based route protection

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI**: Clean interface with smooth animations and transitions
- **Dark Mode Ready**: Prepared for dark theme implementation
- **Accessibility**: WCAG compliant design patterns
- **Performance**: Optimized builds with lazy loading and code splitting

### 📱 Progressive Features
- **Real-time Updates**: Live data synchronization
- **Offline Support**: Cached data for offline viewing
- **Push Notifications**: Browser-based revision reminders
- **PWA Ready**: Progressive Web App capabilities

## 📁 Project Structure

```
client/
├── public/                    # Static assets
│   ├── index.html            # HTML template
│   └── favicon.ico           # App icon
│
├── src/                      # Source code
│   ├── main.tsx             # Application entry point
│   ├── App.tsx              # Main app component
│   ├── vite-env.d.ts        # Vite type definitions
│   │
│   ├── components/          # Reusable React components
│   │   ├── CalendarStrip.tsx    # Horizontal calendar navigation
│   │   ├── DayView.tsx          # Daily task and revision view
│   │   ├── TaskCard.tsx         # Individual task display
│   │   ├── TaskModal.tsx        # Task creation/editing modal
│   │   ├── FloatingAddButton.tsx # Quick task creation button
│   │   ├── TopNav.tsx           # Navigation header
│   │   ├── ConfirmModal.tsx     # Confirmation dialogs
│   │   ├── TwoStepModal.tsx     # 2FA verification modal
│   │   └── LoadingModal.tsx     # Loading animations
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx         # Public landing page
│   │   ├── LoginPage.tsx        # User authentication
│   │   ├── SignupPage.tsx       # User registration
│   │   ├── MainPage.tsx         # Main dashboard
│   │   ├── SettingsPage.tsx     # User preferences
│   │   ├── VerifyEmailPage.tsx  # Email verification
│   │   ├── ForgotPasswordPage.tsx # Password recovery
│   │   └── ResetPasswordPage.tsx # Password reset
│   │
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx     # Authentication state management
│   │
│   ├── services/          # API services
│   │   └── api.ts            # HTTP client and API calls
│   │
│   ├── hooks/             # Custom React hooks
│   │   └── useLoading.ts     # Loading state management
│   │
│   └── styles/           # Styling
│       └── index.css        # Global styles and utilities
│
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md            # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 16+ and npm
- **Backend Server**: RevisionFlow server running (see `/server/README.md`)

### 1. Clone and Install
```bash
git clone <repository-url>
cd Revise Flow/client
npm install
```

### 2. Environment Configuration
Create `.env.local` file (optional, for custom API endpoints):
```env
# API Configuration (optional - defaults to localhost:5000)
VITE_API_URL=http://localhost:5000/api

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false
```

### 3. Development Setup
```bash
# Start development server
npm run dev

# Open browser at http://localhost:3000
```

The client will automatically connect to the backend server at `http://localhost:5000`.

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run preview      # Preview production build locally
```

### Building
```bash
npm run build        # Create production build
npm run lint         # Run ESLint for code quality
```

### Type Checking
```bash
npx tsc --noEmit     # Type check without building
```

## 🎨 Design System

### Color Theme
The application uses a carefully designed color palette:

```javascript
// Primary Colors (Purple)
primary: {
  50: '#F5F3FF',    // Light tints
  500: '#8B5CF6',   // Main primary
  600: '#7C3AED',   // Darker shade
  700: '#6D28D9',   // Even darker
}

// Secondary Colors (Emerald)
secondary: {
  50: '#ECFDF5',
  500: '#10B981',   // Main secondary
  600: '#059669',
}

// Semantic Colors
text: {
  primary: '#0F172A',    // Main text
  secondary: '#475569',   // Secondary text
  tertiary: '#64748B',    // Muted text
}

background: {
  DEFAULT: '#FFFFFF',     // Main background
  secondary: '#F8FAFC',   // Secondary background
}
```

### Component Styling
- **Glass Morphism**: Backdrop blur effects for modern appearance
- **Gradients**: Purple to emerald gradients for primary elements
- **Rounded Corners**: Consistent border radius (8px, 12px, 16px)
- **Shadows**: Layered shadows for depth and hierarchy
- **Animations**: Smooth transitions and micro-interactions

### Typography
- **Font Family**: System font stack for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**: Responsive scaling from mobile to desktop

## 🔧 Key Components

### Authentication Flow
```tsx
// Protected route wrapper
<ProtectedRoute>
  <MainPage />
</ProtectedRoute>

// Auth route wrapper (redirects if logged in)
<AuthRoute>
  <LoginPage />
</AuthRoute>
```

### Task Management
```tsx
// Calendar navigation
<CalendarStrip
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
/>

// Daily view with tasks and revisions
<DayView
  selectedDate={selectedDate}
  onEditTask={handleEditTask}
/>

// Task creation/editing
<TaskModal
  task={editingTask}
  onClose={handleClose}
  onSave={handleSave}
/>
```

### Loading States
```tsx
// Modal loading overlay
<LoadingModal
  isOpen={loading}
  title="Saving..."
  message="Please wait while we save your changes."
/>

// Loading button
<LoadingButton loading={isSubmitting} onClick={handleSubmit}>
  Save Task
</LoadingButton>

// Inline spinner
<LoadingSpinner size="md" />
```

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px    /* Small tablets */
md: 768px    /* Large tablets */
lg: 1024px   /* Small desktops */
xl: 1280px   /* Large desktops */
```

### Mobile-First Approach
- **Base styles**: Mobile-optimized by default
- **Progressive enhancement**: Desktop features added with breakpoints
- **Touch-friendly**: Minimum 44px touch targets
- **Gesture support**: Swipe navigation where appropriate

### Layout Adaptation
- **Navigation**: Responsive header with mobile menu
- **Calendar**: Horizontal scrolling on mobile, full week on desktop
- **Modals**: Full-screen on mobile, centered on desktop
- **Forms**: Stacked on mobile, side-by-side on desktop

## 🔄 State Management

### Context Providers
```tsx
// Authentication context
<AuthProvider>
  <App />
</AuthProvider>
```

### Custom Hooks
```tsx
// Authentication state
const { user, login, logout, loading } = useAuth();

// Loading state management
const { loading, withLoading } = useLoading();

// API calls with loading states
const handleSubmit = () => {
  withLoading(async () => {
    await saveTask(taskData);
  });
};
```

## 🌐 API Integration

### HTTP Client Configuration
```typescript
// Automatic token attachment
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      await refreshToken();
    }
    return Promise.reject(error);
  }
);
```

### API Services
```typescript
// Task management
export const tasksAPI = {
  getTasks: (params) => api.get('/tasks', { params }),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  completeRevision: (taskId, revisionId) => 
    api.patch(`/tasks/${taskId}/revisions/${revisionId}`),
};

// Authentication
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  refreshToken: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
};
```

## 🎯 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **Bundle Analysis**: Size monitoring and optimization

### Runtime Performance
- **Virtual Scrolling**: For large task lists
- **Debounced Search**: Optimized user input handling
- **Memoization**: React.memo and useMemo for expensive operations
- **Lazy Loading**: Component and route lazy loading

### Caching Strategy
- **API Response Caching**: Short-term cache for frequently accessed data
- **Image Caching**: Browser cache optimization
- **Service Worker**: PWA caching (when enabled)

## 🔍 Testing

### Development Testing
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Manual testing
npm run dev
```

### Component Testing
```tsx
// Example component test structure
import { render, screen } from '@testing-library/react';
import TaskCard from '../TaskCard';

test('renders task title', () => {
  render(<TaskCard task={mockTask} />);
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output directory: `dist/`

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-api-domain.com/api
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: Set in Netlify dashboard
```

#### Traditional Hosting
```bash
# Build the project
npm run build

# Upload dist/ folder to web server
# Configure server for SPA routing
```

### Environment Configuration
```env
# Production environment variables
VITE_API_URL=https://api.revisionflow.com/api
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🔧 Browser Support

### Supported Browsers
- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

### Polyfills Included
- **ES6+ Features**: Via Vite
- **CSS Grid**: Native support
- **Flexbox**: Native support

## ♿ Accessibility

### WCAG 2.1 Compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Visible focus indicators

### Accessibility Features
- **Skip Links**: Navigate to main content
- **Alt Text**: Descriptive image alternatives
- **Form Labels**: Proper form labeling
- **Error Messages**: Clear error descriptions

## 🔒 Security

### Client-Side Security
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token-based protection
- **Secure Storage**: Sensitive data handling
- **Content Security Policy**: XSS prevention headers

### Data Protection
- **Token Storage**: Secure token management
- **Sensitive Data**: No sensitive data in localStorage
- **HTTPS Enforcement**: Secure data transmission
- **Input Validation**: Client-side validation (server-side validated)

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch
3. **Develop** with TypeScript and tests
4. **Lint** and type-check code
5. **Submit** pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality rules
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Component Guidelines
- **Props Interface**: Always define TypeScript interfaces
- **Error Boundaries**: Wrap async components
- **Loading States**: Show loading indicators
- **Error Handling**: Graceful error handling

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)

### Styling & Design
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev)
- [Modern CSS Techniques](https://web.dev/learn/css/)

### Tools & Build
- [Vite Documentation](https://vitejs.dev/guide)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Date-fns Documentation](https://date-fns.org/docs)

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ for effective spaced repetition learning**

For backend documentation, see `/server/README.md`