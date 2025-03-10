import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Authentication: React.FC = () => {
  const { login, handleAuthCallback, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle OAuth callback if code is in URL
  useEffect(() => {
    const handleCallback = async () => {
      // Parse the URL for the authorization code
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      
      if (code) {
        setIsLoading(true);
        setError(null);
        
        try {
          const success = await handleAuthCallback(code);
          
          if (success) {
            // Check if there's a redirect URL stored
            const redirectUrl = localStorage.getItem('auth_redirect');
            localStorage.removeItem('auth_redirect'); // Clear it
            
            // Redirect to the stored URL or dashboard
            navigate(redirectUrl || '/');
          } else {
            setError('Authentication failed. Please try again.');
          }
        } catch (err) {
          setError('An unexpected error occurred. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleCallback();
  }, [location, handleAuthCallback, navigate]);
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This will redirect to Google's OAuth page
      login();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            YouTube Virtual Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The AI-powered assistant for your YouTube channel
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm text-gray-700 dark:text-gray-300">
                <p>
                  Welcome to YouTube Virtual Manager! To get started, you'll need to connect your YouTube account.
                  This app requires access to:
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>View and manage your YouTube videos</li>
                  <li>View your YouTube channel statistics</li>
                  <li>View your YouTube Analytics data</li>
                </ul>
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    Connect with YouTube
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>By connecting your account, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication; 