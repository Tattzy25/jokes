import React from 'react';
import { quickPrompts } from '../constants/quickPrompts';

const SidePanel = ({ 
  messageCount, 
  apiCallCount, 
  sessionTime,
  onQuickPrompt,
  onClearChat,
  onExportChat
}) => {
  return (
    <aside className="w-80 bg-gray-800/95 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 overflow-y-auto custom-scrollbar shadow-lg shadow-rose-600/15">
      <div className="mb-8">
        <div className="bg-rose-600/10 border border-rose-600/30 rounded-xl p-4 mb-6 text-sm leading-relaxed text-gray-400">
          <strong className="text-rose-400">🔥 Warning: Adults Only!</strong> 
          <br />This is your no-filter zone for spicy jokes, savage roasts, and naughty humor. Click any category or type your request. No judgments here! 😈
        </div>

        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
          <span>💥</span> Quick Categories
        </h3>
        <div className="flex flex-col gap-3">
          {quickPrompts.map((item, index) => (
            <button
              key={index}
              onClick={() => onQuickPrompt(item.prompt)}
              className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl text-gray-200 cursor-pointer transition-all duration-300 text-left text-sm flex items-center gap-3 hover:bg-rose-600/15 hover:border-rose-600/40 hover:translate-x-2 hover:shadow-lg hover:shadow-rose-600/20"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
          <span>📊</span> Session Stats
        </h3>
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 mb-3 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-rose-600/20">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Jokes & Roasts</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {messageCount}
          </div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 mb-3 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-rose-600/20">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Burns Delivered</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {apiCallCount}
          </div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-rose-600/20">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Session Time</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {sessionTime}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
          <span>🛠️</span> Actions
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={onClearChat}
            className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl text-gray-200 cursor-pointer transition-all duration-300 text-sm flex items-center gap-3 hover:bg-red-600/15 hover:border-red-600/40 hover:translate-x-2 hover:shadow-lg hover:shadow-red-600/20"
          >
            <span>🗑️</span>
            <span>Clear Chat</span>
          </button>
          <button
            onClick={onExportChat}
            className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl text-gray-200 cursor-pointer transition-all duration-300 text-sm flex items-center gap-3 hover:bg-pink-600/15 hover:border-pink-600/40 hover:translate-x-2 hover:shadow-lg hover:shadow-pink-600/20"
          >
            <span>💾</span>
            <span>Export History</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
