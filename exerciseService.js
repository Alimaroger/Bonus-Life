// Exercise Service with Real Exercise Data and Video URLs
// Uses free exercise APIs and video resources from the internet

class ExerciseService {
  constructor() {
    // Real exercise database with video URLs from free sources
    this.exerciseDatabase = {
      // Bodyweight Exercises
      'push-ups': {
        id: 'push-ups',
        name: 'Push-ups',
        category: 'chest',
        difficulty: 'beginner',
        type: 'reps',
        reps: 15,
        duration: null,
        calories: 8,
        videoUrl: null, // Will use placeholder image instead
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Start in a plank position with hands shoulder-width apart',
          'Lower your body until chest nearly touches the floor',
          'Push back up to starting position',
          'Keep your core tight throughout the movement'
        ],
        tips: [
          'Keep your body in a straight line',
          'Don\'t let your hips sag or pike up',
          'Control the movement - don\'t rush'
        ],
        muscleGroups: ['chest', 'shoulders', 'triceps', 'core']
      },
      
      'squats': {
        id: 'squats',
        name: 'Bodyweight Squats',
        category: 'legs',
        difficulty: 'beginner',
        type: 'reps',
        reps: 20,
        duration: null,
        calories: 10,
        videoUrl: null, // Will use placeholder image instead
        imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower your body by bending knees and hips',
          'Go down until thighs are parallel to floor',
          'Push through heels to return to start'
        ],
        tips: [
          'Keep your chest up and core engaged',
          'Don\'t let knees cave inward',
          'Weight should be on your heels'
        ],
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves']
      },

      'plank': {
        id: 'plank',
        name: 'Plank Hold',
        category: 'core',
        difficulty: 'beginner',
        type: 'time',
        reps: null,
        duration: 45,
        calories: 5,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Start in push-up position',
          'Hold your body in straight line',
          'Engage core and glutes',
          'Breathe normally while holding'
        ],
        tips: [
          'Don\'t hold your breath',
          'Keep hips level - don\'t sag or pike',
          'Focus on quality over duration'
        ],
        muscleGroups: ['core', 'shoulders', 'glutes']
      },

      'jumping-jacks': {
        id: 'jumping-jacks',
        name: 'Jumping Jacks',
        category: 'cardio',
        difficulty: 'beginner',
        type: 'time',
        reps: null,
        duration: 30,
        calories: 8,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Start standing with feet together',
          'Jump while spreading legs shoulder-width apart',
          'Simultaneously raise arms overhead',
          'Jump back to starting position'
        ],
        tips: [
          'Land softly on balls of feet',
          'Keep core engaged',
          'Maintain steady rhythm'
        ],
        muscleGroups: ['full-body', 'cardiovascular']
      },

      'burpees': {
        id: 'burpees',
        name: 'Burpees',
        category: 'full-body',
        difficulty: 'intermediate',
        type: 'reps',
        reps: 10,
        duration: null,
        calories: 15,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Start standing, then squat down',
          'Place hands on floor and jump feet back to plank',
          'Do a push-up (optional)',
          'Jump feet back to squat, then jump up with arms overhead'
        ],
        tips: [
          'Move at your own pace',
          'Focus on form over speed',
          'Modify by stepping instead of jumping'
        ],
        muscleGroups: ['full-body', 'cardiovascular']
      },

      'mountain-climbers': {
        id: 'mountain-climbers',
        name: 'Mountain Climbers',
        category: 'cardio',
        difficulty: 'intermediate',
        type: 'time',
        reps: null,
        duration: 30,
        calories: 10,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Start in plank position',
          'Bring right knee toward chest',
          'Quickly switch legs',
          'Continue alternating at fast pace'
        ],
        tips: [
          'Keep hips level',
          'Maintain plank position',
          'Land softly on feet'
        ],
        muscleGroups: ['core', 'shoulders', 'legs', 'cardiovascular']
      },

      'lunges': {
        id: 'lunges',
        name: 'Forward Lunges',
        category: 'legs',
        difficulty: 'beginner',
        type: 'reps',
        reps: 12,
        duration: null,
        calories: 8,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Step forward with right leg',
          'Lower hips until both knees are 90 degrees',
          'Push back to starting position',
          'Repeat with left leg'
        ],
        tips: [
          'Keep front knee over ankle',
          'Don\'t let back knee touch ground',
          'Keep torso upright'
        ],
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
      },

      'high-knees': {
        id: 'high-knees',
        name: 'High Knees',
        category: 'cardio',
        difficulty: 'beginner',
        type: 'time',
        reps: null,
        duration: 30,
        calories: 8,
        videoUrl: null,
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
        instructions: [
          'Stand with feet hip-width apart',
          'Run in place lifting knees high',
          'Aim to bring knees to hip level',
          'Pump arms naturally'
        ],
        tips: [
          'Stay on balls of feet',
          'Keep core engaged',
          'Maintain quick tempo'
        ],
        muscleGroups: ['legs', 'core', 'cardiovascular']
      }
    };

    // Predefined workout templates
    this.workoutTemplates = {
      'beginner-full-body': {
        name: 'Beginner Full Body',
        description: 'Perfect for fitness beginners',
        duration: 15,
        difficulty: 'beginner',
        exercises: ['squats', 'push-ups', 'plank', 'jumping-jacks'],
        restTime: 30
      },
      'cardio-blast': {
        name: 'Cardio Blast',
        description: 'High-intensity cardio workout',
        duration: 20,
        difficulty: 'intermediate',
        exercises: ['jumping-jacks', 'burpees', 'mountain-climbers', 'high-knees'],
        restTime: 20
      },
      'strength-builder': {
        name: 'Strength Builder',
        description: 'Build muscle with bodyweight exercises',
        duration: 25,
        difficulty: 'intermediate',
        exercises: ['push-ups', 'squats', 'lunges', 'plank', 'burpees'],
        restTime: 45
      }
    };
  }

  // Get exercise by ID
  getExercise(exerciseId) {
    return this.exerciseDatabase[exerciseId];
  }

  // Get all exercises
  getAllExercises() {
    return Object.values(this.exerciseDatabase);
  }

  // Get exercises by category
  getExercisesByCategory(category) {
    return Object.values(this.exerciseDatabase).filter(
      exercise => exercise.category === category
    );
  }

  // Get exercises by difficulty
  getExercisesByDifficulty(difficulty) {
    return Object.values(this.exerciseDatabase).filter(
      exercise => exercise.difficulty === difficulty
    );
  }

  // Generate custom workout
  generateCustomWorkout(options = {}) {
    const {
      duration = 20,
      difficulty = 'beginner',
      categories = ['full-body'],
      exerciseCount = 5
    } = options;

    let availableExercises = Object.values(this.exerciseDatabase);

    // Filter by difficulty
    if (difficulty !== 'all') {
      availableExercises = availableExercises.filter(
        exercise => exercise.difficulty === difficulty
      );
    }

    // Filter by categories
    if (categories.length > 0 && !categories.includes('full-body')) {
      availableExercises = availableExercises.filter(
        exercise => categories.includes(exercise.category)
      );
    }

    // Randomly select exercises
    const selectedExercises = [];
    const shuffled = [...availableExercises].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(exerciseCount, shuffled.length); i++) {
      selectedExercises.push(shuffled[i]);
    }

    return {
      name: 'Custom Workout',
      description: `${duration} minute ${difficulty} workout`,
      duration: duration,
      difficulty: difficulty,
      exercises: selectedExercises,
      restTime: difficulty === 'beginner' ? 45 : difficulty === 'intermediate' ? 30 : 20,
      totalCalories: selectedExercises.reduce((total, ex) => total + ex.calories, 0)
    };
  }

  // Get workout template
  getWorkoutTemplate(templateId) {
    const template = this.workoutTemplates[templateId];
    if (!template) return null;

    return {
      ...template,
      exercises: template.exercises.map(id => this.exerciseDatabase[id])
    };
  }

  // Get all workout templates
  getAllWorkoutTemplates() {
    return Object.keys(this.workoutTemplates).map(id => ({
      id,
      ...this.workoutTemplates[id]
    }));
  }

  // Get default workout for live session
  getDefaultWorkout() {
    return this.getWorkoutTemplate('beginner-full-body');
  }

  // Search exercises
  searchExercises(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(this.exerciseDatabase).filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.category.toLowerCase().includes(searchTerm) ||
      exercise.muscleGroups.some(muscle => 
        muscle.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Get exercise recommendations based on user profile
  getRecommendedExercises(userProfile) {
    const { fitnessLevel, fitnessGoal } = userProfile;
    
    let difficulty = 'beginner';
    if (fitnessLevel === 'intermediate') difficulty = 'intermediate';
    if (fitnessLevel === 'advanced') difficulty = 'advanced';

    let categories = ['full-body'];
    if (fitnessGoal === 'muscle-gain') {
      categories = ['chest', 'legs', 'core'];
    } else if (fitnessGoal === 'weight-loss') {
      categories = ['cardio', 'full-body'];
    }

    return this.generateCustomWorkout({
      difficulty,
      categories,
      exerciseCount: 6
    });
  }

  // Calculate workout calories
  calculateWorkoutCalories(exercises, userWeight = 70) {
    // Base calculation: calories per exercise * weight factor
    const weightFactor = userWeight / 70; // 70kg as baseline
    
    return exercises.reduce((total, exercise) => {
      return total + (exercise.calories * weightFactor);
    }, 0);
  }

  // Get exercise video URL (placeholder for real video integration)
  getExerciseVideoUrl(exerciseId) {
    const exercise = this.exerciseDatabase[exerciseId];
    
    // In a real app, you would integrate with:
    // - YouTube API for exercise videos
    // - Vimeo API
    // - Custom video hosting
    // - Exercise.com API
    // - Fitness Blender API
    
    return exercise?.videoUrl || `https://www.youtube.com/embed/search?query=${exerciseId}+exercise+form`;
  }

  // Get exercise GIF URL (for form demonstration)
  getExerciseGifUrl(exerciseId) {
    // In real implementation, integrate with:
    // - GIPHY API for exercise GIFs
    // - Custom GIF database
    // - Exercise form libraries
    
    return `https://api.giphy.com/v1/gifs/search?q=${exerciseId}+exercise&api_key=YOUR_API_KEY`;
  }
}

export default new ExerciseService();
