
import { useState } from 'react';
import { useChat } from 'ai/react';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, append, input, handleInputChange, handleSubmit } = useChat();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (message: string) => {
    append({ role: 'user', content: message });
  };

  return {
    messages,
    isOpen,
    toggleChatbot,
    handleSendMessage,
    input,
    handleInputChange,
    handleSubmit
  };
};
