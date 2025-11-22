import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';

interface CalendarStripProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const CalendarStrip: React.FC<CalendarStripProps> = ({ selectedDate, onDateSelect }) => {
  const selectedDateObj = new Date(selectedDate);
  const today = new Date();

  // Generate 7 days centered around selected date
  const days = [];
  for (let i = -3; i <= 3; i++) {
    const date = addDays(selectedDateObj, i);
    days.push({
      date: date,
      dateString: format(date, 'yyyy-MM-dd'),
      day: format(date, 'd'),
      dayName: format(date, 'EEE'),
      isToday: isSameDay(date, today),
      isSelected: isSameDay(date, selectedDateObj),
    });
  }

  const handlePrevious = () => {
    const newDate = format(subDays(selectedDateObj, 1), 'yyyy-MM-dd');
    onDateSelect(newDate);
  };

  const handleNext = () => {
    const newDate = format(addDays(selectedDateObj, 1), 'yyyy-MM-dd');
    onDateSelect(newDate);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary">
          {format(selectedDateObj, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-1">
          <button
            onClick={handlePrevious}
            className="p-2 text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-secondary dark:hover:bg-background-dark-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-secondary dark:hover:bg-background-dark-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <button
            key={day.dateString}
            onClick={() => onDateSelect(day.dateString)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl min-h-[72px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${day.isSelected
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
              : day.isToday
                ? 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50 text-primary-700 dark:text-primary-400 border-2 border-primary-300 dark:border-primary-600'
                : 'bg-surface dark:bg-surface-dark hover:bg-background-secondary dark:hover:bg-background-dark-secondary text-text-primary dark:text-text-dark-primary border border-border dark:border-border-dark hover:border-primary-200 dark:hover:border-primary-700'
              }`}
          >
            <span className="text-xs font-medium uppercase tracking-wide mb-1 opacity-75">
              {day.dayName.toUpperCase()}
            </span>
            <span className="text-lg font-bold">{day.day}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarStrip;