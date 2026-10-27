import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Save, Bell, Shield, Database, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      highRiskAlerts: true,
      criticalAlerts: true,
      systemUpdates: false,
      weeklyReports: true,
    },
    thresholds: {
      highRiskScore: 40,
      criticalRiskScore: 20,
      velocityThreshold: 5,
      amountThreshold: 50000,
    },
    anchoring: {
      autoAnchor: true,
      anchorDelay: 300, // seconds
      batchSize: 50,
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Mock save operation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Section = ({ title, icon: Icon, children }: { 
    title: string; 
    icon: React.ComponentType<any>; 
    children: React.ReactNode; 
  }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 text-blue-400 mr-3" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure system preferences and thresholds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Section title="Notification Preferences" icon={Bell}>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Section>

        {/* Risk Thresholds */}
        <Section title="Risk Thresholds" icon={AlertTriangle}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">High Risk Score Threshold</label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.thresholds.highRiskScore}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: {
                    ...settings.thresholds,
                    highRiskScore: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Critical Risk Score Threshold</label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.thresholds.criticalRiskScore}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: {
                    ...settings.thresholds,
                    criticalRiskScore: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Velocity Threshold (tx/hour)</label>
              <input
                type="number"
                min="1"
                value={settings.thresholds.velocityThreshold}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: {
                    ...settings.thresholds,
                    velocityThreshold: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Amount Threshold (₹)</label>
              <input
                type="number"
                min="0"
                value={settings.thresholds.amountThreshold}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: {
                    ...settings.thresholds,
                    amountThreshold: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Section>

        {/* User Profile */}
        <Section title="User Profile" icon={Shield}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Phone</label>
              <input
                type="tel"
                value={user?.phone || ''}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Role</label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </Section>

        {/* Blockchain Anchoring */}
        <Section title="Blockchain Anchoring" icon={Database}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Auto-anchor high risk transactions</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.anchoring.autoAnchor}
                  onChange={(e) => setSettings({
                    ...settings,
                    anchoring: {
                      ...settings.anchoring,
                      autoAnchor: e.target.checked
                    }
                  })}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Anchor Delay (seconds)</label>
              <input
                type="number"
                min="0"
                value={settings.anchoring.anchorDelay}
                onChange={(e) => setSettings({
                  ...settings,
                  anchoring: {
                    ...settings.anchoring,
                    anchorDelay: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Batch Size</label>
              <input
                type="number"
                min="1"
                value={settings.anchoring.batchSize}
                onChange={(e) => setSettings({
                  ...settings,
                  anchoring: {
                    ...settings.anchoring,
                    batchSize: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center px-6 py-2 rounded-md font-medium transition-colors ${
            saved 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;