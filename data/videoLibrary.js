// 🎬 Professional Fitness Video Library
// Using high-quality stock videos for professional appearance

export const videoCategories = {
  STRENGTH: 'strength',
  CARDIO: 'cardio',
  FLEXIBILITY: 'flexibility',
  BEGINNER: 'beginner'
};

export const difficultyLevels = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

// 🎥 Professional Stock Videos (Using placeholder URLs - replace with actual stock videos)
export const videoLibrary = [
  // 💪 STRENGTH TRAINING VIDEOS
  {
    id: 'strength-001',
    title: 'Perfect Push-ups Technique',
    description: 'Master the fundamental push-up with proper form and breathing techniques.',
    category: videoCategories.STRENGTH,
    difficulty: difficultyLevels.BEGINNER,
    duration: '4:32',
    durationSeconds: 272,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Placeholder
    instructor: 'Professional Trainer',
    equipment: 'None',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    calories: 45,
    exercises: ['push-ups']
  },
  {
    id: 'strength-002',
    title: 'Squat Fundamentals',
    description: 'Learn proper squat form to build lower body strength safely and effectively.',
    category: videoCategories.STRENGTH,
    difficulty: difficultyLevels.BEGINNER,
    duration: '5:15',
    durationSeconds: 315,
    thumbnail: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', // Placeholder
    instructor: 'Certified Trainer',
    equipment: 'None',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    calories: 60,
    exercises: ['squats']
  },
  {
    id: 'strength-003',
    title: 'Deadlift Safety & Form',
    description: 'Essential deadlift technique for building posterior chain strength.',
    category: videoCategories.STRENGTH,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '6:45',
    durationSeconds: 405,
    thumbnail: 'https://images.unsplash.com/photo-1583500178690-f7fd39d8ba93?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', // Placeholder
    instructor: 'Strength Coach',
    equipment: 'Barbell, Weights',
    targetMuscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Traps'],
    calories: 80,
    exercises: ['deadlifts']
  },
  {
    id: 'strength-004',
    title: 'Plank Variations',
    description: 'Build core strength with progressive plank exercises.',
    category: videoCategories.STRENGTH,
    difficulty: difficultyLevels.BEGINNER,
    duration: '3:30',
    durationSeconds: 210,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Placeholder
    instructor: 'Core Specialist',
    equipment: 'None',
    targetMuscles: ['Core', 'Shoulders', 'Glutes'],
    calories: 35,
    exercises: ['planks']
  },

  // 🏃‍♂️ CARDIO WORKOUT VIDEOS
  {
    id: 'cardio-001',
    title: 'HIIT for Beginners',
    description: 'High-intensity interval training designed for fitness beginners.',
    category: videoCategories.CARDIO,
    difficulty: difficultyLevels.BEGINNER,
    duration: '15:00',
    durationSeconds: 900,
    thumbnail: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4', // Placeholder
    instructor: 'HIIT Specialist',
    equipment: 'None',
    targetMuscles: ['Full Body'],
    calories: 180,
    exercises: ['jumping-jacks', 'burpees', 'mountain-climbers']
  },
  {
    id: 'cardio-002',
    title: 'Running Form Masterclass',
    description: 'Improve your running efficiency and reduce injury risk.',
    category: videoCategories.CARDIO,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '8:20',
    durationSeconds: 500,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', // Placeholder
    instructor: 'Running Coach',
    equipment: 'None',
    targetMuscles: ['Legs', 'Core', 'Cardiovascular'],
    calories: 120,
    exercises: ['running']
  },
  {
    id: 'cardio-003',
    title: 'Jump Rope Basics',
    description: 'Master jump rope techniques for effective cardio workouts.',
    category: videoCategories.CARDIO,
    difficulty: difficultyLevels.BEGINNER,
    duration: '4:45',
    durationSeconds: 285,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', // Placeholder
    instructor: 'Cardio Expert',
    equipment: 'Jump Rope',
    targetMuscles: ['Calves', 'Shoulders', 'Core'],
    calories: 95,
    exercises: ['jump-rope']
  },

  // 🧘‍♀️ FLEXIBILITY & YOGA VIDEOS
  {
    id: 'flexibility-001',
    title: 'Morning Yoga Flow',
    description: 'Gentle yoga sequence to start your day with energy and focus.',
    category: videoCategories.FLEXIBILITY,
    difficulty: difficultyLevels.BEGINNER,
    duration: '12:00',
    durationSeconds: 720,
    thumbnail: 'https://images.unsplash.com/photo-1506629905607-c28b47e8b6b1?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4', // Placeholder
    instructor: 'Yoga Instructor',
    equipment: 'Yoga Mat',
    targetMuscles: ['Full Body', 'Flexibility'],
    calories: 60,
    exercises: ['yoga']
  },
  {
    id: 'flexibility-002',
    title: 'Post-Workout Stretching',
    description: 'Essential stretches to improve recovery and prevent injury.',
    category: videoCategories.FLEXIBILITY,
    difficulty: difficultyLevels.BEGINNER,
    duration: '8:15',
    durationSeconds: 495,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', // Placeholder
    instructor: 'Flexibility Coach',
    equipment: 'None',
    targetMuscles: ['Full Body'],
    calories: 25,
    exercises: ['stretching']
  },
  {
    id: 'flexibility-003',
    title: 'Deep Relaxation & Meditation',
    description: 'Guided meditation and relaxation for stress relief and recovery.',
    category: videoCategories.FLEXIBILITY,
    difficulty: difficultyLevels.BEGINNER,
    duration: '10:30',
    durationSeconds: 630,
    thumbnail: 'https://images.unsplash.com/photo-1506629905607-c28b47e8b6b1?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', // Placeholder
    instructor: 'Meditation Guide',
    equipment: 'None',
    targetMuscles: ['Mind', 'Body'],
    calories: 15,
    exercises: ['meditation']
  },

  // 🌟 BEGINNER SPECIAL PROGRAMS
  {
    id: 'beginner-001',
    title: 'First Week Fitness Program',
    description: 'Complete beginner-friendly workout for your first week of fitness.',
    category: videoCategories.BEGINNER,
    difficulty: difficultyLevels.BEGINNER,
    duration: '20:00',
    durationSeconds: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4', // Placeholder
    instructor: 'Beginner Specialist',
    equipment: 'None',
    targetMuscles: ['Full Body'],
    calories: 150,
    exercises: ['squats', 'push-ups', 'planks', 'jumping-jacks']
  }
];

// 🎯 Helper Functions
export const getVideosByCategory = (category) => {
  return videoLibrary.filter(video => video.category === category);
};

export const getVideosByDifficulty = (difficulty) => {
  return videoLibrary.filter(video => video.difficulty === difficulty);
};

export const getVideoById = (id) => {
  return videoLibrary.find(video => video.id === id);
};

export const getRecommendedVideos = (userLevel = 'beginner', limit = 6) => {
  const filtered = videoLibrary.filter(video => 
    video.difficulty === userLevel || video.category === videoCategories.BEGINNER
  );
  return filtered.slice(0, limit);
};

export const searchVideos = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return videoLibrary.filter(video =>
    video.title.toLowerCase().includes(lowercaseQuery) ||
    video.description.toLowerCase().includes(lowercaseQuery) ||
    video.targetMuscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    video.exercises.some(exercise => exercise.toLowerCase().includes(lowercaseQuery))
  );
};

// 📊 Video Statistics
export const getVideoStats = () => {
  return {
    total: videoLibrary.length,
    byCategory: {
      strength: getVideosByCategory(videoCategories.STRENGTH).length,
      cardio: getVideosByCategory(videoCategories.CARDIO).length,
      flexibility: getVideosByCategory(videoCategories.FLEXIBILITY).length,
      beginner: getVideosByCategory(videoCategories.BEGINNER).length
    },
    byDifficulty: {
      beginner: getVideosByDifficulty(difficultyLevels.BEGINNER).length,
      intermediate: getVideosByDifficulty(difficultyLevels.INTERMEDIATE).length,
      advanced: getVideosByDifficulty(difficultyLevels.ADVANCED).length
    },
    totalDuration: videoLibrary.reduce((total, video) => total + video.durationSeconds, 0)
  };
};
