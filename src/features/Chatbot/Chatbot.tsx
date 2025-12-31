
import React from 'react';
import Message from './Message';
import ChatbotInput from './ChatbotInput';
import { useChatbot } from './useChatbot';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { messages, handleSendMessage } = useChatbot();

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
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <ChatbotInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
