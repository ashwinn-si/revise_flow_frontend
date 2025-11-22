import React, { useState } from 'react';
import { Edit, CheckCircle, Clock, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { googleAPI } from '../services/api';
import ConfirmModal from './ConfirmModal';

interface TaskCardProps {
  task: any;
  type: 'completed' | 'revision';
  onEdit?: (task: any) => void;
  onStatusChange?: (taskId: string, newStatus: string) => void;
  onRefresh?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, type, onEdit, onStatusChange, onRefresh }) => {
  const [isAddingToCalendar, setIsAddingToCalendar] = useState(false);
  const [showPostponeConfirm, setShowPostponeConfirm] = useState(false);

  const handleStatusToggle = () => {
    if (onStatusChange) {
      const newStatus = task.status === 'done' ? 'pending' : 'done';
      onStatusChange(task.id, newStatus);
    }
  };

  const handlePostpone = () => {
    setShowPostponeConfirm(true);
  };

  const handleConfirmPostpone = async () => {
    if (onStatusChange) {
      onStatusChange(task.id, 'postponed');
      // Call refresh after postpone to ensure latest data
      if (onRefresh) {
        setTimeout(() => onRefresh(), 100); // Small delay to allow status update to complete
      }
    }
    setShowPostponeConfirm(false);
  };

  const handleCancelPostpone = () => {
    setShowPostponeConfirm(false);
  };

  // Generate Google Calendar URL for direct link (fallback method)
  const generateGoogleCalendarUrl = () => {
    const title = `Revision: ${task.title}`;
    const description = `Revision of task: ${task.title}${task.notes ? `\\n\\nNotes: ${task.notes}` : ''}\\n\\nThis is a spaced repetition reminder to help strengthen your memory of this topic.`;
    const startDate = new Date(task.scheduledDate || task.completedDate);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
      details: description,
      sf: 'true',
      output: 'xml'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = async () => {
    setIsAddingToCalendar(true);

    try {
      // Try API method first
      await googleAPI.createEvent({
        summary: `Revision: ${task.title}`,
        description: `Revision of task: ${task.title}${task.notes ? `\\n\\nNotes: ${task.notes}` : ''}\\n\\nThis is a spaced repetition reminder to help strengthen your memory of this topic.`,
        start: {
          dateTime: new Date(task.scheduledDate || task.completedDate).toISOString(),
        },
        end: {
          dateTime: new Date(new Date(task.scheduledDate || task.completedDate).getTime() + 60 * 60 * 1000).toISOString(),
        },
      });

      toast.success('Event added to Google Calendar successfully!');
    } catch (error: any) {
      console.error('Failed to add to Google Calendar via API:', error);

      // Fallback to direct Google Calendar link
      const calendarUrl = generateGoogleCalendarUrl();
      window.open(calendarUrl, '_blank');

      toast.info('Opening Google Calendar in a new tab to add the event manually');
    } finally {
      setIsAddingToCalendar(false);
    }
  };

  return (
    <div className="bg-background/60 dark:bg-background-dark/60 border border-border/50 dark:border-border-dark/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:border-border-secondary dark:hover:border-border-dark-secondary group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-1.5 rounded-xl ${type === 'completed'
              ? 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-600 dark:text-secondary-400'
              : 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
              }`}>
              {type === 'completed' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
            </div>
            <h3 className="font-semibold text-text-primary dark:text-text-dark-primary text-base leading-tight">{task.title}</h3>
          </div>

          {task.notes && (
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-3 leading-relaxed pl-8">{task.notes}</p>
          )}

          {type === 'revision' && task.originalDate && (
            <p className="text-xs text-text-tertiary dark:text-text-dark-tertiary pl-8">
              Originally completed: {new Date(task.originalDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4 opacity-80 group-hover:opacity-100 transition-opacity">
          {type === 'revision' && (
            <>
              <button
                onClick={handleStatusToggle}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${task.status === 'done'
                  ? 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-800/50 focus:ring-secondary-500'
                  : 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-sm focus:ring-secondary-500'
                  }`}
              >
                {task.status === 'done' ? 'Completed' : 'Mark Done'}
              </button>

              {task.status !== 'skipped' && task.status !== 'postponed' && task.status !== 'done' && (
                <button
                  onClick={handlePostpone}
                  className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 bg-background dark:bg-background-dark border border-border dark:border-border-dark text-text-secondary dark:text-text-dark-secondary hover:bg-background-secondary dark:hover:bg-background-dark-secondary hover:border-border-secondary dark:hover:border-border-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  Postpone
                </button>
              )}

              <button
                onClick={handleAddToCalendar}
                disabled={isAddingToCalendar}
                className={`p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${isAddingToCalendar
                  ? 'opacity-50 cursor-not-allowed text-text-disabled dark:text-text-dark-disabled'
                  : 'text-text-tertiary dark:text-text-dark-tertiary hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/50'
                  }`}
                title="Add to Google Calendar"
              >
                {isAddingToCalendar ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Calendar size={16} />
                )}
              </button>
            </>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2.5 text-text-tertiary dark:text-text-dark-tertiary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-secondary dark:hover:bg-background-dark-secondary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              title="Edit task"
            >
              <Edit size={16} />
            </button>
          )}
        </div>
      </div>

      {type === 'revision' && (task.status === 'skipped' || task.status === 'postponed' || task.status === 'done') && (
        <div className="mt-4 pt-3 border-t border-border/30 dark:border-border-dark/30">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium ${task.status === 'done'
            ? 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-400'
            : task.status === 'postponed'
              ? 'bg-accent-warning/10 dark:bg-accent-warning/20 text-accent-warning'
              : 'bg-text-disabled/10 dark:bg-text-dark-disabled/20 text-text-disabled dark:text-text-dark-disabled'
            }`}>
            Status: {task.status === 'done' ? 'Completed' : task.status === 'postponed' ? 'Postponed' : 'Skipped'}
          </span>
        </div>
      )}

      {/* Postpone Confirmation Modal */}
      <ConfirmModal
        isOpen={showPostponeConfirm}
        title="Postpone Revision"
        message={`Are you sure you want to postpone the revision for "${task.title}"? This will move the revision to tomorrow so you can review it then.`}
        confirmText="Postpone"
        cancelText="Keep for Today"
        confirmButtonClass="bg-gradient-to-r from-accent-warning to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg"
        onConfirm={handleConfirmPostpone}
        onCancel={handleCancelPostpone}
        icon={<Clock className="w-6 h-6 text-accent-warning" />}
      />
    </div>
  );
};

export default TaskCard;