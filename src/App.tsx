import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VideoAnalytics from './pages/VideoAnalytics';
import ChannelOptimizer from './pages/ChannelOptimizer';
import Settings from './pages/Settings';
import Authentication from './pages/Authentication';
import { useAuth } from './hooks/useAuth';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

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
      {isAuthenticated && (
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      
      <main className={`flex-1 overflow-auto ${!isAuthenticated ? 'w-full' : ''}`}>
        <Routes>
          {/* Public route */}
          <Route path="/auth" element={
            isAuthenticated ? <Navigate to="/" /> : <Authentication />
          } />
          
          {/* Auth callback route */}
          <Route path="/auth/callback" element={<Authentication />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <VideoAnalytics />
            </ProtectedRoute>
          } />
          
          <Route path="/optimizer" element={
            <ProtectedRoute>
              <ChannelOptimizer />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Navigate to="/auth" replace />
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App; 