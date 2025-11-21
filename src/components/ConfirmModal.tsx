import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg",
  onConfirm,
  onCancel,
  icon
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface/95 backdrop-blur-sm border border-border/50 rounded-3xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent-warning/10 rounded-2xl">
              {icon || <AlertCircle className="w-6 h-6 text-accent-warning" />}
            </div>
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-text-tertiary hover:text-text-primary hover:bg-background-secondary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-text-secondary leading-relaxed mb-8 text-base">
          {message}
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 px-6 border-2 border-border hover:border-border-secondary text-text-secondary hover:text-text-primary bg-background hover:bg-background-secondary rounded-2xl transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;