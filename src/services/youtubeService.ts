import axios from 'axios';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { authService } from './authService';
import { env } from '../utils/environment';

// Types
interface YouTubeAuth {
  accessToken: string;
  refreshToken: string;
  expiryDate: number;
}

interface ChannelStats {
  subscribers: number;
  views: number;
  videos: number;
  comments: number;
  averageEngagement: number;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

// YouTube API service
class YouTubeService {
  private youtube: any;
  
  constructor() {
    // Initialize with empty client
    this.youtube = null;
  }
  
  // Initialize YouTube API client with oauth2Client
  private async initialize(): Promise<void> {
    if (this.isInitialized()) return;
    
    try {
      // Get OAuth2 client from auth service
      const oauth2Client = await authService.getOAuth2Client();
      
      // Initialize YouTube API client
      this.youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
      });
    } catch (error) {
      console.error('Error initializing YouTube API client:', error);
      throw error;
    }
  }
  
  // Check if service is initialized
  public isInitialized(): boolean {
    return this.youtube !== null;
  }
  
  // Get channel statistics
  public async getChannelStats(): Promise<ChannelStats> {
    await this.initialize();
    
    try {
      // Get channel data
      const channelResponse = await this.youtube.channels.list({
        part: 'statistics',
        mine: true
      });
      
      const channelStats = channelResponse.data.items[0].statistics;
      
      // Calculate average engagement (simplified)
      const averageEngagement = (parseInt(channelStats.likeCount || '0') + 
                               parseInt(channelStats.commentCount || '0')) / 
                               parseInt(channelStats.videoCount || '1') / 
                               parseInt(channelStats.viewCount || '1') * 100;
      
      return {
        subscribers: parseInt(channelStats.subscriberCount || '0'),
        views: parseInt(channelStats.viewCount || '0'),
        videos: parseInt(channelStats.videoCount || '0'),
        comments: parseInt(channelStats.commentCount || '0'),
        averageEngagement: parseFloat(averageEngagement.toFixed(2))
      };
    } catch (error) {
      console.error('Error fetching channel stats:', error);
      throw error;
    }
  }
  
  // Get recent videos
  public async getRecentVideos(maxResults: number = 10): Promise<VideoData[]> {
    await this.initialize();
    
    try {
      // Get videos from channel
      const searchResponse = await this.youtube.search.list({
        part: 'snippet',
        forMine: true,
        maxResults,
        order: 'date',
        type: 'video'
      });
      
      const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId);
      
      // Get detailed video statistics
      const videosResponse = await this.youtube.videos.list({
        part: 'snippet,statistics',
        id: videoIds.join(',')
      });
      
      // Map response to VideoData objects
      return videosResponse.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        views: parseInt(item.statistics.viewCount || '0'),
        likes: parseInt(item.statistics.likeCount || '0'),
        comments: parseInt(item.statistics.commentCount || '0'),
        tags: item.snippet.tags || []
      }));
    } catch (error) {
      console.error('Error fetching recent videos:', error);
      throw error;
    }
  }
  
  // Get video analytics
  public async getVideoAnalytics(videoId: string): Promise<any> {
    await this.initialize();
    
    try {
      // In a real implementation, this would use the YouTube Analytics API
      // For now, we'll return mock data
      return {
        viewsOverTime: {
          // Mock data for views over time
          days: Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
          views: Array.from({ length: 14 }, () => Math.floor(Math.random() * 1000) + 100)
        },
        demographics: {
          // Mock data for demographics
          ageGroups: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
          ageDistribution: [5, 28, 35, 22, 7, 2, 1],
          genderDistribution: {
            male: 72,
            female: 26,
            other: 2
          }
        },
        // Add more mock analytics as needed
      };
    } catch (error) {
      console.error('Error fetching video analytics:', error);
      throw error;
    }
  }
  
  // Update video metadata (title, description, tags)
  public async updateVideo(videoId: string, data: Partial<VideoData>): Promise<boolean> {
    await this.initialize();
    
    try {
      // Get current video data
      const videoResponse = await this.youtube.videos.list({
        part: 'snippet',
        id: videoId
      });
      
      const videoSnippet = videoResponse.data.items[0].snippet;
      
      // Update with new data
      await this.youtube.videos.update({
        part: 'snippet',
        requestBody: {
          id: videoId,
          snippet: {
            ...videoSnippet,
            title: data.title || videoSnippet.title,
            description: data.description || videoSnippet.description,
            tags: data.tags || videoSnippet.tags,
            categoryId: videoSnippet.categoryId
          }
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const youtubeService = new YouTubeService(); 