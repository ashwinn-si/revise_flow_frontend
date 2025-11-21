import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { calendarAPI, tasksAPI } from '../services/api';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  notes?: string;
  completedDate: string;
}

interface Revision {
  id: string;
  taskId: string;
  title: string;
  scheduledDate: string;
  status: 'pending' | 'done' | 'skipped' | 'postponed';
}

interface DayViewProps {
  selectedDate: string;
  onEditTask?: (task: Task) => void;
  refreshTrigger?: number; // Add refresh trigger prop
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, onEditTask, refreshTrigger }) => {
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [revisionsDue, setRevisionsDue] = useState<Revision[]>([]);
  const [error, setError] = useState('');

  const fetchDayData = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching day data for:', selectedDate);

      const response = await calendarAPI.getDay(selectedDate);
      console.log('Calendar API response:', response.data);

      // Access data from response.data.data because the API wraps the response in { success: true, data: { ... } }
      const dayData = response.data.data || response.data;
      console.log('Day data extracted:', dayData);

      setCompletedTasks(dayData.completedTasks || []);
      setRevisionsDue(dayData.revisionsScheduledForDate || []);

      console.log('Set state:', {
        completedTasks: dayData.completedTasks?.length || 0,
        revisions: dayData.revisionsScheduledForDate?.length || 0
      });
    } catch (err: any) {
      console.error('Failed to fetch day data:', err);
      setError('Failed to load data for this day');
      setCompletedTasks([]);
      setRevisionsDue([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Refreshing day data...');
    await fetchDayData();
  };

  useEffect(() => {
    fetchDayData();
  }, [selectedDate, refreshTrigger]); // Add refreshTrigger to dependencies

  const handleRevisionStatusChange = async (revisionId: string, newStatus: string) => {
    const revision = revisionsDue.find(r => r.id === revisionId);
    if (!revision) {
      toast.error('Revision not found');
      return;
    }

    console.log('Updating revision status:', { revisionId, taskId: revision.taskId, newStatus });

    try {
      const response = await tasksAPI.updateRevisionStatus(revision.taskId, revisionId, newStatus);

      console.log('Status update response:', response.data);

      // Handle postpone response with additional info
      if (newStatus === 'postponed' && response.data.postponeInfo) {
        const { newDate } = response.data.postponeInfo;
        const formattedDate = new Date(newDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        toast.success(`Revision postponed to tomorrow (${formattedDate})`);

        // Remove the revision from current day since it's been moved
        setRevisionsDue(prev => prev.filter(r => r.id !== revisionId));

        // Refresh the day data to get updated revisions
        try {
          console.log('Refreshing day data after postpone...');
          const refreshResponse = await calendarAPI.getDay(selectedDate);
          const dayData = refreshResponse.data.data || refreshResponse.data;
          setCompletedTasks(dayData.completedTasks || []);
          setRevisionsDue(dayData.revisionsScheduledForDate || []);
          console.log('Day data refreshed successfully');
        } catch (refreshError) {
          console.error('Failed to refresh day data:', refreshError);
          // Keep the optimistic update if refresh fails
        }
      } else {
        setRevisionsDue(prev =>
          prev.map(r =>
            r.id === revisionId
              ? { ...r, status: newStatus as 'pending' | 'done' | 'skipped' | 'postponed' }
              : r
          )
        );
        toast.success(`Revision marked as ${newStatus}`);
      }
    } catch (error: any) {
      console.error('Failed to update revision status:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to update revision status';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-6 bg-gradient-to-r from-border to-transparent rounded-2xl w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gradient-to-r from-border/50 to-transparent rounded-2xl"></div>
              <div className="h-20 bg-gradient-to-r from-border/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-6 bg-gradient-to-r from-border to-transparent rounded-2xl w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gradient-to-r from-border/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-accent-error/10 border border-accent-error/20 rounded-3xl p-8 shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-error/10 rounded-2xl mb-4">
            <svg className="w-6 h-6 text-accent-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-accent-error font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent-error/10 hover:bg-accent-error/20 text-accent-error font-semibold px-6 py-2.5 rounded-2xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Completed Tasks Section */}
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-secondary-100 rounded-xl group-hover:bg-secondary-200 transition-colors">
            <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary">
            Completed Tasks
          </h2>
          <div className="flex-1">
            <div className="h-px bg-gradient-to-r from-border/50 to-transparent"></div>
          </div>
        </div>

        <div className="bg-surface/40 backdrop-blur-sm border border-border/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          {completedTasks.length > 0 ? (
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id || (task as any)._id}
                  task={{ ...task, id: task.id || (task as any)._id }}
                  type="completed"
                  onEdit={onEditTask}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-text-tertiary/10 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-text-tertiary font-medium">
                No tasks completed on {format(new Date(selectedDate), 'MMM d, yyyy')}
              </p>
              <p className="text-text-disabled text-sm mt-1">
                Complete tasks to see them here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Revisions Due Section */}
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary">
            Revisions Due Today
          </h2>
          <div className="flex-1">
            <div className="h-px bg-gradient-to-r from-border/50 to-transparent"></div>
          </div>
        </div>

        <div className="bg-surface/40 backdrop-blur-sm border border-border/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          {revisionsDue.length > 0 ? (
            <div className="space-y-3">
              {revisionsDue.map((revision) => (
                <TaskCard
                  key={revision.id}
                  task={revision}
                  type="revision"
                  onStatusChange={handleRevisionStatusChange}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-text-tertiary/10 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-text-tertiary font-medium">
                No revisions scheduled for today
              </p>
              <p className="text-text-disabled text-sm mt-1">
                Enjoy your day! Come back tomorrow for more reviews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;