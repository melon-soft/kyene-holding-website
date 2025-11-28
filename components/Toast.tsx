

import React from 'react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import type { ToastType } from '../types';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const icons = {
  success: <CheckCircle className="h-6 w-6 text-green-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
  error: <XCircle className="h-6 w-6 text-red-500" />,
};

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const Icon = icons[type];
  const style = {
    success: {
        bg: 'bg-green-50',
        border: 'border-green-400',
    },
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-400',
    },
  }[type];

  return (
    <div
      role="alert"
      className={`relative w-full p-4 pr-12 border-l-4 rounded-lg shadow-xl flex items-start space-x-4 animate-toast-in ${style.bg} ${style.border}`}
    >
      <div className="flex-shrink-0">{Icon}</div>
      <p className="text-sm font-medium text-slate-700">{message}</p>
      <button
        onClick={onDismiss}
        className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-full text-slate-500 hover:bg-slate-200/70 transition-colors"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>
      <style>{`
        @keyframes toast-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-toast-in {
          animation: toast-in 0.5s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;