import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for demonstration
const mockData = {
  channelStats: {
    subscribers: 12500,
    views: 850000,
    videos: 48,
    comments: 3200,
    averageEngagement: 8.4
  },
  recentVideos: [
    { id: 1, title: 'How to Optimize YouTube SEO in 2023', views: 1840, likes: 320, comments: 45, publishedAt: '2023-11-10' },
    { id: 2, title: 'Top 10 YouTube Growth Hacks', views: 2450, likes: 410, comments: 62, publishedAt: '2023-10-25' },
    { id: 3, title: 'Creating Viral YouTube Shorts', views: 5200, likes: 890, comments: 103, publishedAt: '2023-10-12' },
  ],
  viewsData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Views',
        data: [12000, 15000, 18000, 16000, 22000, 25000, 31000, 35000, 42000, 45000, 48000, 52000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  },
  subscribersData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Subscribers',
        data: [8000, 8500, 9000, 9200, 9600, 10100, 10500, 10900, 11400, 11800, 12200, 12500],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  },
  trafficSources: {
    labels: ['Search', 'External', 'Suggested Videos', 'Notifications', 'Direct', 'Other'],
    datasets: [
      {
        data: [40, 20, 15, 10, 10, 5],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(75, 85, 99)'
        ]
      }
    ]
  }
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; change?: string; positive?: boolean }> = ({ 
  title, value, icon, change, positive 
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </div>
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
        {icon}
      </div>
    </div>
    {change && (
      <div className={`mt-3 text-sm ${positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
        {change}
      </div>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would fetch data from the YouTube API
  useEffect(() => {
    // Simulating API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Chart options
  const lineOptions = {
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Channel Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Subscribers" 
              value={data.channelStats.subscribers.toLocaleString()} 
              icon={<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0010-2z"></path></svg>} 
              change="+320 (2.6%)" 
              positive={true} 
            />
            <StatCard 
              title="Total Views" 
              value={data.channelStats.views.toLocaleString()} 
              icon={<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>} 
              change="+14.2K (8.7%)" 
              positive={true} 
            />
            <StatCard 
              title="Videos" 
              value={data.channelStats.videos.toLocaleString()} 
              icon={<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>} 
              change="+2 (4.3%)" 
              positive={true} 
            />
            <StatCard 
              title="Avg. Engagement" 
              value={`${data.channelStats.averageEngagement}%`} 
              icon={<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>} 
              change="-0.3%" 
              positive={false} 
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Views Over Time</h2>
              <div className="h-72">
                <Line data={data.viewsData} options={lineOptions} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Traffic Sources</h2>
              <div className="h-72 flex items-center justify-center">
                <Doughnut data={data.trafficSources} />
              </div>
            </div>
          </div>

          {/* Recent Videos Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Recent Videos</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Video</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Published</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Likes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.recentVideos.map(video => (
                    <tr key={video.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>
                          <div className="text-sm font-medium">{video.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{video.publishedAt}</td>
                      <td className="px-6 py-4 text-sm">{video.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">{video.likes.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">{video.comments.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">AI Optimization Suggestions</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Upload Schedule Optimization</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  Based on your audience analytics, uploading videos on Tuesdays and Thursdays around 3 PM EST could increase your views by up to 18%.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-300">Keyword Opportunities</h3>
                <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                  Including keywords like "beginner guide", "step-by-step", and "tutorial" in your titles could help you reach a wider audience.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 dark:text-purple-300">Content Suggestion</h3>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-400">
                  Your audience shows high engagement with tutorial-style content. Consider creating more how-to videos to increase watch time.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 