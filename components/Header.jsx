import React from 'react';

const Header = ({ isConnected }) => {
  return (
    <header className="bg-gray-800/95 backdrop-blur-lg px-8 py-6 border-b border-gray-700 relative z-100 shadow-lg shadow-rose-600/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-rose-600 via-pink-700 to-red-500 rounded-xl flex items-center justify-center text-2xl animate-pulse-slow shadow-lg shadow-rose-600/50">
            🔥
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Spicy Roast & Joke Generator
          </h1>
          <span className="px-3 py-1 bg-rose-600/20 border border-rose-600/40 rounded-full text-xs text-rose-400 font-semibold">
            18+ ONLY
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-3 bg-rose-600/10 border border-rose-600/30 rounded-full font-medium">
            <div className={`w-2.5 h-2.5 rounded-full animate-blink ${
              isConnected ? 'bg-green-500 shadow-lg shadow-green-500/80' : 'bg-red-500 shadow-lg shadow-red-500/80'
            }`}></div>
            <span>{isConnected ? 'Ready to Roast' : 'Loading...'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
