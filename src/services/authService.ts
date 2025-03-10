import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../utils/environment';

// Auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiryDate: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  tokens: AuthTokens | null;
}

// Auth service
class AuthService {
  private oauth2Client: OAuth2Client;
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    tokens: null
  };
  
  constructor() {
    // Initialize OAuth client
    this.oauth2Client = new google.auth.OAuth2(
      env.youtubeClientId,
      env.youtubeClientSecret,
      env.youtubeRedirectUri
    );
    
    // Load stored auth state if available
    this.loadAuthState();
  }
  
  // Get OAuth2 URL for authorization
  public getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];
    
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent' // Force to always show the consent screen
    });
  }
  
  // Exchange code for tokens
  public async exchangeCodeForTokens(code: string): Promise<AuthTokens> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      
      if (!tokens.access_token || !tokens.expiry_date) {
        throw new Error('Invalid tokens received');
      }
      
      const authTokens: AuthTokens = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || '',
        expiryDate: tokens.expiry_date
      };
      
      // Set credentials in the OAuth client
      this.oauth2Client.setCredentials(tokens);
      
      // Save auth state
      this.authState = {
        isAuthenticated: true,
        user: await this.fetchUserInfo(),
        tokens: authTokens
      };
      
      this.saveAuthState();
      
      return authTokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }
  
  // Check if the user is authenticated
  public isAuthenticated(): boolean {
    return this.authState.isAuthenticated && !!this.authState.tokens;
  }
  
  // Get current user
  public getUser(): any | null {
    return this.authState.user;
  }
  
  // Get tokens
  public getTokens(): AuthTokens | null {
    return this.authState.tokens;
  }
  
  // Logout user
  public logout(): void {
    this.authState = {
      isAuthenticated: false,
      user: null,
      tokens: null
    };
    
    this.saveAuthState();
  }
  
  // Refresh token if needed
  public async refreshTokenIfNeeded(): Promise<boolean> {
    if (!this.authState.tokens) {
      return false;
    }
    
    const now = Date.now();
    const expiryDate = this.authState.tokens.expiryDate;
    
    // If token is about to expire (within 5 minutes)
    if (expiryDate - now < 5 * 60 * 1000) {
      try {
        // Set existing credentials to refresh
        this.oauth2Client.setCredentials({
          refresh_token: this.authState.tokens.refreshToken
        });
        
        const { credentials } = await this.oauth2Client.refreshAccessToken();
        
        if (credentials.access_token && credentials.expiry_date) {
          this.authState.tokens = {
            accessToken: credentials.access_token,
            refreshToken: credentials.refresh_token || this.authState.tokens.refreshToken,
            expiryDate: credentials.expiry_date
          };
          
          this.saveAuthState();
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
      }
    }
    
    return true;
  }
  
  // Get OAuth client (with refreshed tokens if needed)
  public async getOAuth2Client(): Promise<OAuth2Client> {
    await this.refreshTokenIfNeeded();
    
    if (this.authState.tokens) {
      this.oauth2Client.setCredentials({
        access_token: this.authState.tokens.accessToken,
        refresh_token: this.authState.tokens.refreshToken,
        expiry_date: this.authState.tokens.expiryDate
      });
    }
    
    return this.oauth2Client;
  }
  
  // Fetch user info from Google
  private async fetchUserInfo(): Promise<any> {
    try {
      const oauth2 = google.oauth2({
        auth: this.oauth2Client,
        version: 'v2'
      });
      
      const { data } = await oauth2.userinfo.get();
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }
  
  // Save auth state to local storage or electron store
  private saveAuthState(): void {
    // In real app, would use a more secure storage method
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.store.set('auth_state', this.authState);
    } else {
      localStorage.setItem('auth_state', JSON.stringify(this.authState));
    }
  }
  
  // Load auth state from local storage or electron store
  private async loadAuthState(): Promise<void> {
    try {
      let storedState: AuthState | null = null;
      
      if (typeof window !== 'undefined' && window.electronAPI) {
        storedState = await window.electronAPI.store.get('auth_state');
      } else {
        const stateStr = localStorage.getItem('auth_state');
        if (stateStr) {
          storedState = JSON.parse(stateStr);
        }
      }
      
      if (storedState && storedState.tokens) {
        this.authState = storedState;
        
        // Verify the loaded tokens still work
        if (!(await this.refreshTokenIfNeeded())) {
          // If refresh fails, reset auth state
          this.logout();
        }
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      this.logout();
    }
  }
}

// Export singleton instance
export const authService = new AuthService(); 