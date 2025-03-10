import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (redirectUrl?: string) => void;
  logout: () => void;
  user: any | null;
  handleAuthCallback: (code: string) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
  user: null,
  handleAuthCallback: async () => false,
});

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthed = authService.isAuthenticated();
        
        if (isAuthed) {
          setIsAuthenticated(true);
          setUser(authService.getUser());
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Redirect to OAuth login
  const login = (redirectUrl?: string) => {
    // Store the redirect URL if provided
    if (redirectUrl) {
      localStorage.setItem('auth_redirect', redirectUrl);
    }
    
    // Get auth URL and redirect
    const authUrl = authService.getAuthUrl();
    window.location.href = authUrl;
  };

  // Handle OAuth callback
  const handleAuthCallback = async (code: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authService.exchangeCodeForTokens(code);
      setIsAuthenticated(true);
      setUser(authService.getUser());
      
      return true;
    } catch (error) {
      console.error('Auth callback failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        user,
        handleAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Declare window.electronAPI
declare global {
  interface Window {
    electronAPI: {
      store: {
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<boolean>;
      };
      selectDirectory: () => Promise<string | null>;
      platform: string;
    };
  }
} 