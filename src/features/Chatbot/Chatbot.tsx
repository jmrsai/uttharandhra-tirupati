
import React from 'react';
import Message from './Message';
import ChatbotInput from './ChatbotInput';
import { useChatbot } from './useChatbot';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { messages, handleSendMessage, input, handleInputChange, handleSubmit } = useChatbot();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.content} sender={msg.role === 'user' ? 'user' : 'bot'} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <ChatbotInput
          onSendMessage={handleSendMessage}
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default Chatbot;
