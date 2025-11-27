import React from 'react';

const Message = ({ text, sender, time, onSpeak }) => {
  const isUser = sender === 'user';
  const avatar = isUser ? '😈' : '🔥';

  return (
    <div className={`message mb-6 animate-slideIn ${isUser ? 'user-message' : 'bot-message'}`}>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
      <div className="flex gap-4 items-start">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl ${
          isUser 
            ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/40' 
            : 'bg-gradient-to-br from-rose-600 to-red-800 shadow-lg shadow-rose-600/40'
        }`}>
          {avatar}
        </div>
        <div className={`flex-1 p-5 rounded-2xl max-w-[75%] shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-pink-500/25 to-rose-600/25 border border-pink-500/40 ml-auto'
            : 'bg-gradient-to-br from-rose-600/25 to-red-800/25 border border-rose-600/40'
        }`}>
          <div className="text-base leading-relaxed whitespace-pre-wrap break-words">
            {text}
          </div>
          <div className="text-xs text-gray-500 mt-3 flex items-center gap-2">
            <span>{time}</span>
            {!isUser && (
              <div className="ml-auto">
                <button
                  onClick={() => onSpeak(text)}
                  className="w-7 h-7 rounded-full bg-gray-800/30 border border-gray-700 text-gray-400 hover:bg-rose-600/20 hover:border-rose-500 hover:text-rose-400 transition-all duration-300 flex items-center justify-center"
                  title="Speak"
                >
                  🔊
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
