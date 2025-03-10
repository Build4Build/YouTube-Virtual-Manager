import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const videos = [
  { id: 'vid1', title: 'How to Make YouTube Videos - Beginner Guide', views: 5240, likes: 420, comments: 78, publishedAt: '2023-11-10' },
  { id: 'vid2', title: 'Growing Your YouTube Channel in 2024', views: 8120, likes: 630, comments: 92, publishedAt: '2023-10-25' },
  { id: 'vid3', title: 'Video Editing Tutorial for Beginners', views: 12400, likes: 980, comments: 145, publishedAt: '2023-10-12' },
];

const mockVideoAnalytics = {
  viewsOverTime: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14'],
    datasets: [
      {
        label: 'Views',
        data: [320, 450, 780, 890, 1200, 1350, 1420, 1520, 1680, 1780, 1890, 2050, 2300, 2510],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  },
  engagementMetrics: {
    labels: ['Likes', 'Comments', 'Shares', 'Subscribers Gained', 'Saved'],
    datasets: [
      {
        label: 'Engagement',
        data: [980, 145, 320, 210, 175],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  },
  audienceRetention: {
    labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
    datasets: [
      {
        label: 'Audience Retention',
        data: [100, 98, 95, 92, 86, 78, 68, 58, 45, 32, 20],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  },
  trafficSources: {
    labels: ['YouTube Search', 'Browse Features', 'External', 'Suggested Videos', 'Notifications', 'Other'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [45, 24, 15, 10, 5, 1],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(75, 85, 99, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  },
  demographicData: {
    age: {
      labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      datasets: [
        {
          label: 'Age Distribution',
          data: [5, 28, 35, 22, 7, 2, 1],
          backgroundColor: 'rgba(59, 130, 246, 0.7)'
        }
      ]
    },
    gender: {
      male: 72,
      female: 26,
      other: 2
    },
    topCountries: [
      { country: 'United States', percentage: 42 },
      { country: 'United Kingdom', percentage: 12 },
      { country: 'Canada', percentage: 8 },
      { country: 'Australia', percentage: 6 },
      { country: 'Germany', percentage: 5 }
    ]
  }
};

const VideoAnalytics: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0].id);
  const [timeRange, setTimeRange] = useState('14days');
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const barOptions = {
    ...chartOptions,
    indexAxis: 'y' as const,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Video Analytics</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label htmlFor="video-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Video:
            </label>
            <select
              id="video-select"
              className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
            >
              {videos.map(video => (
                <option key={video.id} value={video.id}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Range:
            </label>
            <select
              id="time-range"
              className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="14days">Last 14 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Video Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/5">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <h2 className="text-lg font-medium">{videos.find(v => v.id === selectedVideo)?.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on {videos.find(v => v.id === selectedVideo)?.publishedAt}
            </p>
          </div>
          
          <div className="w-full md:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Views</div>
              <div className="text-2xl font-bold mt-1">{videos.find(v => v.id === selectedVideo)?.views.toLocaleString()}</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">+12.5% vs. previous period</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">Likes</div>
              <div className="text-2xl font-bold mt-1">{videos.find(v => v.id === selectedVideo)?.likes.toLocaleString()}</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">+8.3% vs. previous period</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Comments</div>
              <div className="text-2xl font-bold mt-1">{videos.find(v => v.id === selectedVideo)?.comments.toLocaleString()}</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">+5.2% vs. previous period</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Views Over Time</h2>
          <div className="h-80">
            <Line data={mockVideoAnalytics.viewsOverTime} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Audience Retention</h2>
          <div className="h-80">
            <Line data={mockVideoAnalytics.audienceRetention} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Engagement Metrics</h2>
          <div className="h-80">
            <Bar data={mockVideoAnalytics.engagementMetrics} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Traffic Sources</h2>
          <div className="h-80">
            <Bar data={mockVideoAnalytics.trafficSources} options={barOptions} />
          </div>
        </div>
      </div>
      
      {/* Demographics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">Audience Demographics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Age Distribution</h3>
            <div className="h-60">
              <Bar data={mockVideoAnalytics.demographicData.age} options={chartOptions} />
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Gender Distribution</h3>
            <div className="flex flex-col gap-3 mt-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Male</span>
                  <span className="text-sm font-medium">{mockVideoAnalytics.demographicData.gender.male}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${mockVideoAnalytics.demographicData.gender.male}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Female</span>
                  <span className="text-sm font-medium">{mockVideoAnalytics.demographicData.gender.female}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${mockVideoAnalytics.demographicData.gender.female}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Other</span>
                  <span className="text-sm font-medium">{mockVideoAnalytics.demographicData.gender.other}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${mockVideoAnalytics.demographicData.gender.other}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Top Countries</h3>
            <div className="space-y-4 mt-4">
              {mockVideoAnalytics.demographicData.topCountries.map((country, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{country.country}</span>
                    <span className="text-sm font-medium">{country.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${country.percentage * 2}%` }} // Multiplying by 2 to make the bars more visible
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4">AI-Powered Insights</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Performance Insight</h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              This video is performing 18% better than your channel average. The higher than average audience retention
              suggests your content is engaging viewers effectively.
            </p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Improvement Opportunity</h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              There's a significant drop in audience retention at 4:35. Consider reviewing this section to identify
              what might be causing viewers to leave.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 dark:text-green-300">Action Recommendation</h3>
            <p className="mt-1 text-sm text-green-700 dark:text-green-400">
              Your audience is highly engaged with this topic. Consider creating a follow-up video or series to
              capitalize on this interest and potentially increase your subscriber growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalytics; 