import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  user: any | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
  user: null,
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
        // Check if there's a stored token
        const token = await window.electronAPI.store.get('youtube_auth_token');
        
        if (token) {
          // TODO: Validate token or refresh if needed
          setIsAuthenticated(true);
          setUser({ token });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: any): Promise<boolean> => {
    setLoading(true);
    try {
      // Here you would implement OAuth2 flow with Google/YouTube
      // For now, we'll just simulate a successful login
      await window.electronAPI.store.set('youtube_auth_token', 'sample_token');
      setIsAuthenticated(true);
      setUser({ token: 'sample_token' });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    window.electronAPI.store.set('youtube_auth_token', null);
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