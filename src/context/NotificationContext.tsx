
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PushNotification } from '../types/types';

interface NotificationContextType {
  notifications: PushNotification[];
  unreadCount: number;
  permission: NotificationPermission;
  requestPermission: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  sendNotification: (title: string, message: string, category: PushNotification['category']) => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void; // Add this line
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  try {
    const [notifications, setNotifications] = useState<PushNotification[]>([]);
    const [permission, setPermission] = useState<NotificationPermission>(
      typeof window !== 'undefined' ? (Notification as any).permission : 'default'
    );

    const loadNotifications = () => {
      const stored = localStorage.getItem('temple_push_notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    };

    useEffect(() => {
      loadNotifications();
      
      // Listen for cross-tab broadcasts
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'temple_push_notifications') {
          loadNotifications();
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const requestPermission = async () => {
      if ('Notification' in window) {
        const res = await Notification.requestPermission();
        setPermission(res);
      }
    };

    const markAsRead = (id: string) => {
      const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
      setNotifications(updated);
      localStorage.setItem('temple_push_notifications', JSON.stringify(updated));
    };

    const markAllAsRead = () => {
      const updated = notifications.map(n => ({ ...n, isRead: true }));
      setNotifications(updated);
      localStorage.setItem('temple_push_notifications', JSON.stringify(updated));
    };

    const sendNotification = (title: string, message: string, category: PushNotification['category']) => {
      const newNotification: PushNotification = {
        id: Date.now().toString(),
        title,
        message,
        category,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      const updated = [newNotification, ...notifications];
      setNotifications(updated);
      localStorage.setItem('temple_push_notifications', JSON.stringify(updated));

      // Browser Notification
      if (permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: '/vite.svg'
        });
      }

      // Trigger storage event for other tabs
      window.dispatchEvent(new Event('storage_update'));
    };
    
    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      // You can implement a more sophisticated notification system here (e.g., using a library like react-toastify)
      alert(`${type.toUpperCase()}: ${message}`);
    };


    return (
      <NotificationContext.Provider value={{
        notifications,
        unreadCount,
        permission,
        requestPermission,
        markAsRead,
        markAllAsRead,
        sendNotification,
        showNotification
      }}>
        {children}
      </NotificationContext.Provider>
    );
  } catch (error) {
    console.error('Error in NotificationProvider:', error);
    // Optionally, render a fallback UI
    return <div>Something went wrong in NotificationProvider.</div>;
  }
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
