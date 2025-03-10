import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Environment utility for accessing environment variables safely
export const env = {
  // YouTube API
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  youtubeClientId: process.env.YOUTUBE_CLIENT_ID || '',
  youtubeClientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
  youtubeRedirectUri: process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:5173/auth/callback',
  
  // OpenAI API
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  
  // App settings
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Helper function to check if required variables are set
  validate(): string[] {
    const missingVars = [];
    
    // Check YouTube API variables
    if (!this.youtubeApiKey) missingVars.push('YOUTUBE_API_KEY');
    if (!this.youtubeClientId) missingVars.push('YOUTUBE_CLIENT_ID');
    if (!this.youtubeClientSecret) missingVars.push('YOUTUBE_CLIENT_SECRET');
    
    // Check OpenAI API variables
    if (!this.openaiApiKey) missingVars.push('OPENAI_API_KEY');
    
    return missingVars;
  }
};

// Export a function to check for required environment variables
export function checkEnvironment(): boolean {
  const missingVars = env.validate();
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:');
    missingVars.forEach(variable => {
      console.error(`- ${variable}`);
    });
    return false;
  }
  
  return true;
} 