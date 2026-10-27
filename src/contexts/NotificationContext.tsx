import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  txId?: string;
  timestamp: Date;
  dismissed?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    // Only add notifications if user is logged in and is an investigator
    if (!user || user.role !== 'investigator') {
      return;
    }
    
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]);
  }, [user]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, dismissed: true } : n));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      dismissNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};