
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Videos from './components/Videos';
import Audio from './components/Audio';
import Library from './components/Library';
import Gallery from './components/Gallery';
import Sevas from './components/Sevas';
import Donation from './components/Donation';
import History from './components/History';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/Admin';
import Feedback from './components/Feedback';
import Login from './components/Login';
import Live from './components/Live'; // Import the Live component
import { logEvent } from './firebase/firebase';
import { useChatbot } from './features/Chatbot/useChatbot';
import Chatbot from './features/Chatbot/Chatbot';
import ChatbotIcon from './features/Chatbot/ChatbotIcon';
import './features/Chatbot/Chatbot.css';
import './i18n'; // Import the i18n configuration

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent('page_view', {
      page_path: location.pathname + location.search + location.hash,
      page_title: document.title
    });
  }, [location]);

  return null;
};

export const App: React.FC = () => {
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <LanguageProvider>
      <NotificationProvider>
        <HashRouter>
          <AnalyticsTracker />
          <MusicPlayer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="history" element={<History />} />
              <Route path="sevas" element={<Sevas />} />
              <Route path="donation" element={<Donation />} />
              <Route path="videos" element={<Videos />} />
              <Route path="audio" element={<Audio />} />
              <Route path="library" element={<Library />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="live" element={<Live />} /> {/* Add the Live route */}
              <Route path="admin" element={<Admin />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
          <ChatbotIcon onClick={toggleChatbot} />
          <Chatbot isOpen={isOpen} onClose={toggleChatbot} />
        </HashRouter>
      </NotificationProvider>
    </LanguageProvider>
  );
};
