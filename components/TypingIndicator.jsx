import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="message mb-4">
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl bg-gradient-to-br from-rose-600 to-red-800 shadow-lg shadow-rose-600/40">
          🔥
        </div>
        <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-rose-600/25 to-red-800/25 border border-rose-600/40 shadow-lg">
          <div className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-typing shadow-lg shadow-rose-600/60"></div>
            <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-typing shadow-lg shadow-rose-600/60" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-typing shadow-lg shadow-rose-600/60" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
