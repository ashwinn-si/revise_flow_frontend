import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Bell,
  BarChart3,
  Smartphone,
  Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Spaced Revision System',
      description: 'Scientifically-backed revision reminders on 3rd & 7th day (fully customizable) to optimize learning retention.'
    },
    {
      icon: Calendar,
      title: 'Smart Calendar View',
      description: 'Day-by-day navigation with intuitive task management and automatic revision scheduling.'
    },
    {
      icon: Bell,
      title: 'Email Notifications',
      description: 'Daily reminder emails sent at 6:00 AM in your local timezone to keep you on track.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visual completion indicators and statistics to monitor your learning progress.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Responsive interface optimized for both mobile and desktop usage.'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT authentication with two-factor authentication and secure password reset.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary-50/30 dark:from-background-dark dark:via-background-dark-secondary dark:to-primary-950/30">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-text-dark-primary mb-6">
            Master Your Learning with
            <span className="text-primary-600 dark:text-primary-400 block">Spaced Revision</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary mb-8 max-w-3xl mx-auto">
            RevisionFlow helps you log completed tasks and schedule intelligent spaced-revision
            reminders using scientifically-backed intervals to optimize your learning retention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border-2 border-border dark:border-border-dark hover:border-primary-300 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 text-text-primary dark:text-text-dark-primary px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark-primary mb-4">
            Powerful Features for Effective Learning
          </h2>
          <p className="text-lg text-text-secondary dark:text-text-dark-secondary">
            Everything you need to optimize your revision schedule and boost retention
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-text-primary dark:text-text-dark-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-text-secondary dark:text-text-dark-secondary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-surface dark:bg-surface-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark-primary mb-4">
              How RevisionFlow Works
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-dark-secondary">
              Simple steps to supercharge your learning process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark-primary mb-2">Log Your Tasks</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                Add completed learning tasks, study sessions, or any content you want to revise.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark-primary mb-2">Automatic Scheduling</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                RevisionFlow automatically schedules revision reminders based on proven spaced repetition principles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark-primary mb-2">Get Reminded & Review</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                Receive timely email reminders and use the calendar view to complete your scheduled revisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of learners who have improved their retention with RevisionFlow.
          </p>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-50 text-primary-600 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg inline-block"
          >
            Start Your Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-text-dark-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-dark-primary mb-4">📝 RevisionFlow</h3>
            <p className="text-sm">
              Built with ❤️ for effective spaced repetition learning
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
              <Link to="/signup" className="hover:text-primary-400 transition-colors">Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;