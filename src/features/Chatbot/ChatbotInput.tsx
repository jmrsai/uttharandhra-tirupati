
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatbotInputProps {
  onSend: (message: string) => void;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-input-container p-4 bg-white border-t-2 border-saffron-200">
      <div className="flex items-center bg-saffron-50 rounded-full overflow-hidden px-2 border border-saffron-200 focus-within:ring-2 focus-within:ring-saffron-400 transition-shadow duration-200">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="w-full p-3 bg-transparent focus:outline-none text-saffron-900 placeholder-saffron-400"
        />
        <button onClick={handleSend} className="p-3 rounded-full bg-saffron-600 text-white hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-offset-2 transition-colors duration-200">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotInput;
