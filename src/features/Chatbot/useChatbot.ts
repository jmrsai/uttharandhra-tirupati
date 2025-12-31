
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../../config';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      const botMessage: Message = { text, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting response from bot:", error);
      const errorMessage: Message = {
        text: "I'm sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return {
    messages,
    isOpen,
    toggleChatbot,
    handleSendMessage,
  };
};
