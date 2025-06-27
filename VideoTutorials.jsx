import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import VideoPlayer from '../components/VideoPlayer';
import { 
  videoLibrary, 
  videoCategories, 
  difficultyLevels,
  getVideosByCategory,
  getVideosByDifficulty,
  searchVideos,
  getVideoStats
} from '../data/videoLibrary';
import { useAuth } from '../context/AuthContext';

const VideoTutorials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videoLibrary);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const { currentUser } = useAuth();

  const stats = getVideoStats();

  useEffect(() => {
    let videos = videoLibrary;

    // Apply category filter
    if (activeCategory !== 'all') {
      videos = getVideosByCategory(activeCategory);
    }

    // Apply difficulty filter
    if (activeDifficulty !== 'all') {
      videos = videos.filter(video => video.difficulty === activeDifficulty);
    }

    // Apply search filter
    if (searchQuery) {
      videos = searchVideos(searchQuery);
    }

    setFilteredVideos(videos);
  }, [activeCategory, activeDifficulty, searchQuery]);

  const handleVideoComplete = (videoId) => {
    setWatchedVideos(prev => new Set([...prev, videoId]));
    // Here you could also save to Firebase/localStorage
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'strength': return '💪';
      case 'cardio': return '🏃‍♂️';
      case 'flexibility': return '🧘‍♀️';
      case 'beginner': return '🌟';
      default: return '🎬';
    }
  };

  return (
    <>
      <Navigation />
      <div className="page-bg">
        <div className="container-custom">
          <div className="section">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="hero-title text-gradient mb-6">
                🎬 Video Tutorials
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional fitness instruction with expert trainers
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                <div className="stat-card">
                  <div className="text-2xl font-black text-red-600 font-heading">{stats.total}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Total Videos</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-black text-red-600 font-heading">{stats.byCategory.strength}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Strength</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-black text-red-600 font-heading">{stats.byCategory.cardio}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Cardio</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-black text-red-600 font-heading">{Math.floor(stats.totalDuration / 60)}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Minutes</div>
                </div>
              </div>
            </div>

            {/* Video Player Section */}
            {selectedVideo && (
              <div className="card mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mb-2">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full ${getDifficultyColor(selectedVideo.difficulty)}`}>
                      {selectedVideo.difficulty.charAt(0).toUpperCase() + selectedVideo.difficulty.slice(1)}
                    </span>
                    <span className="text-gray-600">👨‍🏫 {selectedVideo.instructor}</span>
                    <span className="text-gray-600">⏱️ {selectedVideo.duration}</span>
                    <span className="text-gray-600">🔥 {selectedVideo.calories} cal</span>
                    {selectedVideo.equipment !== 'None' && (
                      <span className="text-gray-600">🏋️ {selectedVideo.equipment}</span>
                    )}
                  </div>
                </div>

                <VideoPlayer
                  videoSrc={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  duration={selectedVideo.duration}
                  onComplete={() => handleVideoComplete(selectedVideo.id)}
                  className="w-full h-64 md:h-96"
                />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Target Muscles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.targetMuscles.map((muscle, index) => (
                        <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Related Exercises</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.exercises.map((exercise, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {exercise.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="card mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Videos
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, muscle, or exercise..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All Categories</option>
                    <option value={videoCategories.STRENGTH}>💪 Strength Training</option>
                    <option value={videoCategories.CARDIO}>🏃‍♂️ Cardio Workouts</option>
                    <option value={videoCategories.FLEXIBILITY}>🧘‍♀️ Flexibility & Yoga</option>
                    <option value={videoCategories.BEGINNER}>🌟 Beginner Programs</option>
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All Levels</option>
                    <option value={difficultyLevels.BEGINNER}>🟢 Beginner</option>
                    <option value={difficultyLevels.INTERMEDIATE}>🟡 Intermediate</option>
                    <option value={difficultyLevels.ADVANCED}>🔴 Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="card hover:shadow-xl transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-300 hover:scale-110"
                      >
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    
                    {/* Watched Badge */}
                    {watchedVideos.has(video.id) && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{getCategoryIcon(video.category)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {video.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>👨‍🏫 {video.instructor}</span>
                      <span>🔥 {video.calories} cal</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="w-full mt-4 btn-primary"
                    >
                      ▶️ Watch Tutorial
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoTutorials;
