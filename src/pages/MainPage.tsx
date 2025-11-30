import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TopNav from '../components/TopNav';
import CalendarStrip from '../components/CalendarStrip';
import DayView from '../components/DayView';
import TaskModal from '../components/TaskModal';
import FloatingAddButton from '../components/FloatingAddButton';
import { tasksAPI } from '../services/api';

const MainPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger state

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = async (task: any) => {
    try {
      // Fetch latest task details
      const response = await tasksAPI.getTask(task.id);
      // Handle response structure (apiService might return data directly or wrapped)
      const taskData = response.data.data || response.data;
      setEditingTask(taskData);
      setShowTaskModal(true);
    } catch (error) {
      console.error('Failed to fetch task details:', error);
      toast.error('Failed to load task details');
    }
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleTaskSaved = () => {
    setShowTaskModal(false);
    setEditingTask(null);
    // Trigger refresh of DayView data
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary-50/30 dark:from-background-dark dark:via-background-dark-secondary dark:to-primary-950/30">
      <TopNav />

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-text-dark-primary">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}!
              </h1>
              <p className="text-text-secondary dark:text-text-dark-secondary mt-1">
                Let's make today productive
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl px-4 py-2">
                <span className="text-sm text-text-tertiary dark:text-text-dark-tertiary">Today</span>
                <div className="text-lg font-semibold text-text-primary dark:text-text-dark-primary">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Strip */}
        <div className="mb-8">
          <div className="bg-surface/60 dark:bg-surface-dark/60 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-6 shadow-lg">
            <CalendarStrip
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        {/* Day View */}
        <div className="bg-surface/60 dark:bg-surface-dark/60 backdrop-blur-sm border border-border/50 dark:border-border-dark/50 rounded-3xl p-6 shadow-lg">
          <DayView
            selectedDate={selectedDate}
            onEditTask={handleEditTask}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={handleAddTask} />

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          selectedDate={selectedDate}
          onClose={handleCloseTaskModal}
          onSave={handleTaskSaved}
        />
      )}
    </div>
  );
};

/*
ASCII Layout of MainPage:

┌──────────────────────────────────────────────────────────────┐
│                        TopNav                                │
│  [RevisionFlow]                      [Settings] [Logout]     │
├──────────────────────────────────────────────────────────────┤
│                     CalendarStrip                            │
│  [◀] [19] [20*] [21] [22] [23] [24] [25] [▶]               │
│                    (badges: • = has tasks)                   │
├──────────────────────────────────────────────────────────────┤
│                       DayView                               │
│  ┌─ Completed Tasks (Nov 20, 2025) ─────────────────────────┐ │
│  │  □ Learn React Hooks                                     │ │
│  │    Notes: Focus on useEffect                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌─ Revisions Due Today ──────────────────────────────────────┐ │
│  │  ◯ Review Chapter 3 (from Nov 17)                       │ │
│  │    [Mark Done] [Reschedule] [+ Calendar]                │ │
│  └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                                                    [+] ← FloatingAddButton

Mobile layout: Same structure but stack components vertically,
reduce padding, make calendar strip scrollable horizontally.
*/

export default MainPage;