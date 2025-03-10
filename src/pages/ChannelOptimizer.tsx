import React, { useState } from 'react';

// Mock optimization features and results
const OptimizationFeatures = [
  {
    id: 'keywords',
    title: 'Keyword Analysis',
    description: 'Analyze your video keywords and find better options to increase discoverability.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
  },
  {
    id: 'thumbnails',
    title: 'Thumbnail Analysis',
    description: 'Analyze your thumbnails and get suggestions for more clickable designs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'titles',
    title: 'Title Optimization',
    description: 'Generate better titles for your videos based on trending topics and SEO.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'descriptions',
    title: 'Description Enhancement',
    description: 'Optimize your video descriptions with better formatting and keywords.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'schedule',
    title: 'Upload Schedule',
    description: 'Determine the best time to upload videos based on your audience activity.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'audience',
    title: 'Audience Analysis',
    description: 'Understand who your viewers are and what content they prefer.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

// Mock results for keyword analysis
const mockKeywordResults = [
  { 
    original: 'how to make youtube videos', 
    suggestion: 'how to create viral youtube videos',
    searchVolume: '18,100',
    competition: 'Medium',
    potentialViews: '+42%',
  },
  { 
    original: 'youtube growth', 
    suggestion: 'youtube growth strategy 2024',
    searchVolume: '9,400',
    competition: 'Low',
    potentialViews: '+28%',
  },
  { 
    original: 'video editing tutorial', 
    suggestion: 'professional video editing tutorial for beginners',
    searchVolume: '22,800',
    competition: 'Medium',
    potentialViews: '+35%',
  },
];

const ChannelOptimizer: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string>('all');

  // Mock videos for the selector
  const videos = [
    { id: 'all', title: 'All Videos' },
    { id: 'vid1', title: 'How to Make YouTube Videos - Beginner Guide' },
    { id: 'vid2', title: 'Growing Your YouTube Channel in 2024' },
    { id: 'vid3', title: 'Video Editing Tutorial for Beginners' },
  ];

  // Mock running the optimization
  const runOptimization = () => {
    if (!selectedFeature) return;
    
    setIsRunning(true);
    setResults(null);
    
    // Simulate API call to AI service
    setTimeout(() => {
      setIsRunning(false);
      // For demonstration, just show keyword results
      setResults(mockKeywordResults);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Channel Optimizer</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Let AI analyze your channel and suggest improvements to boost views and engagement.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Video Selection</h2>
        <div className="max-w-md">
          <label htmlFor="video-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select videos to optimize:
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {OptimizationFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer transition-all ${
              selectedFeature === feature.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedFeature(feature.id)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className={`p-2 rounded-md ${
                  selectedFeature === feature.id 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {feature.icon}
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          onClick={runOptimization}
          disabled={!selectedFeature || isRunning}
        >
          {isRunning ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Your Channel...
            </>
          ) : (
            'Run AI Optimization'
          )}
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium">Optimization Results: Keyword Analysis</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Suggested Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Search Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Competition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Potential Views</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{result.original}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">{result.suggestion}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.searchVolume}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.competition}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{result.potentialViews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-300">AI Recommendation</h3>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                Your current keywords are too generic. Using more specific, long-tail keywords as suggested above can help your videos rank better for targeted searches, 
                potentially increasing your views by 28-42%. Consider adding these keywords to your video titles, descriptions, and tags.
              </p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Apply Suggestions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelOptimizer; 