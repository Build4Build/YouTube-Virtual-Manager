import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VideoAnalytics from './pages/VideoAnalytics';
import ChannelOptimizer from './pages/ChannelOptimizer';
import Settings from './pages/Settings';
import Authentication from './pages/Authentication';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Show loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {isAuthenticated ? (
        <>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<VideoAnalytics />} />
              <Route path="/optimizer" element={<ChannelOptimizer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Authentication />} />
        </Routes>
      )}
    </div>
  );
};

export default App; 