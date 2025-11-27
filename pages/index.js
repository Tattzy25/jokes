import React, { useState, useEffect, useRef } from 'react';
import Message from '../components/Message';
import TypingIndicator from '../components/TypingIndicator';
import Header from '../components/Header';
import SidePanel from '../components/SidePanel';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      text: "🔥 Welcome to the Spicy Zone! I'm your no-filter joke master and roast expert. Ready to get burned or laugh your ass off? Pick a category or just ask me anything... if you can handle it! 😈",
      sender: 'bot',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [sessionTime, setSessionTime] = useState('0:00');
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const sessionStartTime = useRef(Date.now());

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update session time
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setSessionTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      text,
      sender,
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, newMessage]);
    if (sender === 'user') {
      setMessageCount(prev => prev + 1);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    addMessage(userMessage, 'user');
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      addMessage(data.joke, 'bot');
      setApiCallCount(prev => prev + 1);
    } catch (error) {
      addMessage("Oops! Even my dirty mind couldn't come up with that one. Try again! 😅", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = async (prompt) => {
    if (!prompt.trim()) return;
    
    addMessage(prompt, 'user');
    setIsTyping(true);

    try {
      const response = await fetch('/api/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      addMessage(data.joke, 'bot');
      setApiCallCount(prev => prev + 1);
    } catch (error) {
      addMessage("Oops! Even my dirty mind couldn't come up with that one. Try again! 😅", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      text: "🔥 Fresh start! Ready for more spicy content? Let's go! 😈",
      sender: 'bot',
      time: getCurrentTime()
    }]);
    setMessageCount(1);
    setApiCallCount(0);
    sessionStartTime.current = Date.now();
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender.toUpperCase()}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spicy-jokes-export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="bg-animation"></div>
      
      <Header isConnected={isConnected} />

      <div className="max-w-7xl mx-auto h-[calc(100vh-88px)] flex p-6 gap-6">
        <main className="flex-1 flex flex-col bg-gray-800/95 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden shadow-lg shadow-rose-600/15">
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {messages.map((message, index) => (
              <Message
                key={index}
                {...message}
                onSpeak={speakText}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-800/95">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for a roast, dirty joke, or anything spicy! 🔥"
                  className="w-full p-4 bg-gray-800/30 border-2 border-gray-700 rounded-full text-gray-200 resize-none transition-all duration-300 min-h-[55px] max-h-[140px] focus:border-rose-600 focus:bg-gray-800/50 focus:shadow-lg focus:shadow-rose-600/30"
                  rows={1}
                  maxLength={500}
                />
                <span className="absolute bottom-[-22px] right-4 text-xs text-gray-500">
                  {inputText.length}/500
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => speakText(inputText)}
                  className="w-14 h-14 rounded-full bg-gray-800/30 border-2 border-gray-700 text-gray-400 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 flex items-center justify-center text-xl"
                  title="Speak Input"
                >
                  🔊
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-600 via-pink-700 to-red-500 text-white shadow-lg shadow-rose-600/40 hover:shadow-xl hover:shadow-rose-600/60 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl"
                  title="Send Message"
                >
                  🔥
                </button>
              </div>
            </div>
          </div>
        </main>

        <SidePanel
          messageCount={messageCount}
          apiCallCount={apiCallCount}
          sessionTime={sessionTime}
          onQuickPrompt={handleQuickPrompt}
          onClearChat={clearChat}
          onExportChat={exportChat}
        />
      </div>
    </div>
  );
}
