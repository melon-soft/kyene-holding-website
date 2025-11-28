import React from 'react';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from './Logo';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex items-center justify-center animate-fadeOutPreloader">
      <div className="animate-pulse-slow">
        <Logo className="h-14 w-auto text-white" />
      </div>
       <style>{`
        @keyframes fadeOutPreloader {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fadeOutPreloader {
          animation: fadeOutPreloader 2.5s ease-in-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
