import React, { useState, useEffect } from 'react';
import { X, Calendar, Plus, Minus } from 'lucide-react';
import { toast } from 'react-toastify';
import { tasksAPI } from '../services/api';

interface TaskModalProps {
  task?: any;
  selectedDate: string;
  onClose: () => void;
  onSave: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, selectedDate, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [completedDate, setCompletedDate] = useState(selectedDate);
  const [revisions, setRevisions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!task;

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setNotes(task.notes || '');
      setCompletedDate(formatDateForInput(task.completedDate) || selectedDate);
      setRevisions(task.revisions?.map((r: any) => formatDateForInput(r.scheduledDate)) || []);
    } else {
      // Set default revisions for new task (3rd and 7th day)
      const completed = new Date(selectedDate);
      const revision1 = new Date(completed);
      revision1.setDate(revision1.getDate() + 3);
      const revision2 = new Date(completed);
      revision2.setDate(revision2.getDate() + 7);

      setRevisions([
        revision1.toISOString().split('T')[0],
        revision2.toISOString().split('T')[0]
      ]);
    }
  }, [task, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await tasksAPI.update(task.id || task._id, {
          title,
          notes,
          completedDate,
          revisions,
        });
        toast.success('Task updated successfully!');
      } else {
        await tasksAPI.create({
          title,
          notes,
          completedDate,
          revisions,
        });
        toast.success('Task created successfully!');
      }

      onSave();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to save task';

      // If there are validation details, show them
      if (err.response?.data?.details) {
        const details = err.response.data.details.map((d: any) => `${d.field}: ${d.message}`).join(', ');
        setError(`${errorMessage}. Details: ${details}`);
      } else {
        setError(errorMessage);
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addRevision = () => {
    const lastDate = revisions[revisions.length - 1] || completedDate;
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 7); // Default to 7 days later
    setRevisions([...revisions, nextDate.toISOString().split('T')[0]]);
  };

  const removeRevision = (index: number) => {
    setRevisions(revisions.filter((_, i) => i !== index));
  };

  const updateRevision = (index: number, date: string) => {
    const newRevisions = [...revisions];
    newRevisions[index] = date;
    setRevisions(newRevisions);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-surface/95 backdrop-blur-sm border border-border/50 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-border/50 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-2xl">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-tertiary hover:text-text-primary hover:bg-background-secondary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-text-primary">
                Task Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What did you complete?"
                className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-text-primary placeholder-text-tertiary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-semibold text-text-primary">
                Notes <span className="text-text-tertiary font-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details or insights..."
                rows={4}
                className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-text-primary placeholder-text-tertiary resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="completedDate" className="block text-sm font-semibold text-text-primary">
                Completed Date *
              </label>
              <input
                id="completedDate"
                type="date"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-text-primary"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-text-primary">
                  Revision Schedule
                </label>
                <button
                  type="button"
                  onClick={addRevision}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <Plus size={16} />
                  <span>Add Revision</span>
                </button>
              </div>

              <div className="space-y-3">
                {revisions.map((date, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background border border-border rounded-2xl">
                    <div className="p-2 bg-secondary-100 rounded-xl">
                      <Calendar size={16} className="text-secondary-600" />
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => updateRevision(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-transparent border-none focus:outline-none text-text-primary"
                    />
                    <button
                      type="button"
                      onClick={() => removeRevision(index)}
                      className="p-2 text-accent-error hover:bg-accent-error/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-error/20"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}

                {revisions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-text-tertiary/10 rounded-2xl mb-3">
                      <Calendar className="w-6 h-6 text-text-tertiary" />
                    </div>
                    <p className="text-text-tertiary font-medium">
                      No revisions scheduled
                    </p>
                    <p className="text-text-disabled text-sm mt-1">
                      Click "Add Revision" to schedule review dates
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-accent-error/10 border border-accent-error/20 text-accent-error px-4 py-3.5 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex space-x-3 mt-8 pt-6 border-t border-border/30">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 px-6 border-2 border-border hover:border-border-secondary text-text-secondary hover:text-text-primary bg-background hover:bg-background-secondary rounded-2xl transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-2xl transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                isEditing ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;