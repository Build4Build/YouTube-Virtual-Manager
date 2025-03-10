# YouTube Virtual Manager

An AI-powered YouTube Channel Optimizer that helps manage, organize, and optimize your YouTube channel to increase traffic and engagement.

## Features

- **Dashboard**: Get a comprehensive overview of your channel's performance
- **Video Analytics**: Detailed analytics for each of your videos
- **Channel Optimizer**: AI-powered suggestions to improve your channel's performance
- **Dark Mode**: Easy on the eyes for late-night work sessions

## Technologies Used

- Electron
- React
- TypeScript
- Tailwind CSS
- Chart.js
- YouTube API
- OpenAI API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- YouTube API credentials
- OpenAI API key (for AI optimization features)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/pH-7/YouTube-Virtual-Manager.git
   cd YouTube-Virtual-Manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Building for Production

To build the app for production:

```
npm run build
npm run package
```

This will create distributable packages in the `dist` directory.

## How It Works

YouTube Virtual Manager uses the YouTube API to fetch data about your channel and videos. It then analyzes this data using AI to provide optimization suggestions that can help increase your views, engagement, and subscriber growth.

The app provides:

1. **Data Visualization**: Charts and graphs to help you understand your channel's performance
2. **AI Analysis**: Intelligent insights about your content and audience
3. **Optimization Suggestions**: Actionable recommendations to improve your channel
4. **Automated Tasks**: Set up automated optimizations based on AI recommendations

## License

This project is licensed under the ISC License.

## Acknowledgments

- YouTube Data API
- OpenAI API
- Electron community
- React community 