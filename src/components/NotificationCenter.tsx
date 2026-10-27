import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, Notification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const { notifications, dismissNotification, addNotification } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only start notifications for logged-in investigators
    if (!user || user.role !== 'investigator') {
      return;
    }

    // Mock WebSocket connection for real-time alerts
    const mockWebSocket = () => {
      // Simulate incoming alerts
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of alert
          const riskLevels = ['HIGH', 'CRITICAL'];
          const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
          const txId = `UPI${Date.now()}${Math.floor(Math.random() * 1000)}`;
          
          addNotification({
            type: riskLevel === 'CRITICAL' ? 'error' : 'warning',
            title: `${riskLevel} Risk Transaction Detected`,
            message: `Transaction ${txId} requires immediate attention`,
            txId: txId,
          });
        }
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    };

    const cleanup = mockWebSocket();
    
    return cleanup;
  }, [addNotification, user]);

  // Don't render anything if user is not logged in or not an investigator
  if (!user || user.role !== 'investigator') {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/30 border-green-500/50';
      case 'warning':
        return 'bg-yellow-900/30 border-yellow-500/50';
      case 'error':
        return 'bg-red-900/30 border-red-500/50';
      case 'info':
      default:
        return 'bg-blue-900/30 border-blue-500/50';
    }
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.txId) {
      navigate(`/transaction/${notification.txId}`);
      dismissNotification(notification.id);
    }
  };

  const visibleNotifications = notifications.filter(n => !n.dismissed).slice(0, 5);

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} backdrop-blur-sm border rounded-lg p-4 shadow-lg animate-slide-in-right cursor-pointer transition-all hover:scale-105`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                {notification.title}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissNotification(notification.id);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;