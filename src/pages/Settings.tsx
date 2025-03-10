import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [aiModel, setAiModel] = useState('gpt-4');
  const [apiKeySaved, setApiKeySaved] = useState(true);
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••');
  const [editingApiKey, setEditingApiKey] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    videoPerformanceAlerts: true,
    commentNotifications: false,
    weeklyReports: true
  });
  const [dataExportFormat, setDataExportFormat] = useState('csv');
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Save settings
  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, would save to backend/Electron store
      window.electronAPI.store.set('settings', {
        aiModel,
        apiKey: editingApiKey ? apiKey : '••••••••••••••••••••••••••', // Don't save the actual key in this demo
        notificationSettings,
        dataExportFormat,
        autoOptimize
      });
      
      setLoading(false);
      setSaved(true);
      setEditingApiKey(false);
      
      // Reset saved notification after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 800);
  };
  
  // Handle notification toggles
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure your YouTube Virtual Manager preferences.
        </p>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-md font-medium">YouTube Account</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connected account: <span className="font-medium">MyYouTubeChannel</span>
              </p>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Disconnect Account
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-md font-medium mb-2">Email Address</h3>
            <div className="flex max-w-md">
              <input
                type="email"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value="user@example.com"
                readOnly
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">AI Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="ai-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              AI Model
            </label>
            <select
              id="ai-model"
              className="block w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
            >
              <option value="gpt-4">GPT-4 (Recommended)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
              <option value="claude">Claude</option>
            </select>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select your preferred AI model for channel optimization.
            </p>
          </div>
          
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              OpenAI API Key
            </label>
            <div className="flex max-w-md">
              <input
                id="api-key"
                type={editingApiKey ? "text" : "password"}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                readOnly={!editingApiKey}
              />
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setEditingApiKey(!editingApiKey)}
              >
                {editingApiKey ? "Cancel" : "Change"}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your OpenAI API key is required for advanced AI features.
            </p>
          </div>
          
          <div className="flex items-center">
            <input
              id="auto-optimize"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={autoOptimize}
              onChange={() => setAutoOptimize(!autoOptimize)}
            />
            <label htmlFor="auto-optimize" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              Enable automatic optimization
            </label>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-6">
            Allow the app to automatically optimize your videos and channel settings based on AI recommendations.
          </p>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="email-notifications"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
              <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Email Notifications
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="desktop-notifications"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.desktopNotifications}
                onChange={() => handleNotificationChange('desktopNotifications')}
              />
              <label htmlFor="desktop-notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Desktop Notifications
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="video-performance"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.videoPerformanceAlerts}
                onChange={() => handleNotificationChange('videoPerformanceAlerts')}
              />
              <label htmlFor="video-performance" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Video Performance Alerts
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="comment-notifications"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.commentNotifications}
                onChange={() => handleNotificationChange('commentNotifications')}
              />
              <label htmlFor="comment-notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                New Comment Notifications
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="weekly-reports"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.weeklyReports}
                onChange={() => handleNotificationChange('weeklyReports')}
              />
              <label htmlFor="weekly-reports" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Weekly Performance Reports
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Export */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Data Export</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="export-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Export Format
            </label>
            <select
              id="export-format"
              className="block w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={dataExportFormat}
              onChange={(e) => setDataExportFormat(e.target.value)}
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="json">JSON</option>
            </select>
          </div>
          
          <div className="pt-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Export Analytics Data
            </button>
          </div>
        </div>
      </div>
      
      {/* App Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">App Information</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Platform</span>
            <span>{window.electronAPI.platform}</span>
          </div>
          <div className="pt-4">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              Check for Updates
            </button>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : saved ? "Settings Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Settings; 