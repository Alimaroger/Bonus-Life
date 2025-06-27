// 💪 Exercise Database Seeds
// Initial exercise data for the Content Management System

export const exerciseSeeds = [
  {
    name: 'Push-ups',
    description: 'A classic upper body exercise that targets chest, shoulders, and triceps. Great for building upper body strength and can be done anywhere.',
    category: 'strength',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: ['chest', 'shoulders', 'triceps', 'core'],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width apart',
      'Keep your body in a straight line from head to heels',
      'Lower your chest toward the ground by bending your elbows',
      'Push back up to the starting position',
      'Repeat for desired number of repetitions'
    ],
    tips: [
      'Keep your core engaged throughout the movement',
      'Don\'t let your hips sag or pike up',
      'Control the descent - don\'t drop down quickly',
      'Breathe in on the way down, out on the way up'
    ],
    variations: [
      'Knee push-ups for beginners',
      'Incline push-ups using a bench',
      'Diamond push-ups for triceps focus',
      'Wide-grip push-ups for chest emphasis'
    ],
    duration: 60,
    calories: 35,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['bodyweight', 'upper-body', 'beginner-friendly']
  },
  {
    name: 'Squats',
    description: 'A fundamental lower body exercise that targets quadriceps, glutes, and hamstrings. Essential for building leg strength and functional movement.',
    category: 'strength',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings', 'core'],
    instructions: [
      'Stand with feet shoulder-width apart, toes slightly turned out',
      'Keep your chest up and core engaged',
      'Lower down by pushing your hips back and bending your knees',
      'Go down until your thighs are parallel to the ground',
      'Drive through your heels to return to standing position'
    ],
    tips: [
      'Keep your knees in line with your toes',
      'Don\'t let your knees cave inward',
      'Keep your weight on your heels',
      'Maintain a neutral spine throughout'
    ],
    variations: [
      'Goblet squats with dumbbell',
      'Jump squats for cardio',
      'Single-leg pistol squats',
      'Sumo squats for inner thigh focus'
    ],
    duration: 45,
    calories: 40,
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['bodyweight', 'lower-body', 'functional']
  },
  {
    name: 'Plank',
    description: 'An isometric core exercise that builds stability and strength throughout the entire core, shoulders, and back.',
    category: 'core',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: ['core', 'abs', 'shoulders', 'back'],
    instructions: [
      'Start in a push-up position with forearms on the ground',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the desired time',
      'Breathe normally throughout the hold'
    ],
    tips: [
      'Don\'t let your hips sag or pike up',
      'Keep your head in neutral position',
      'Squeeze your glutes to maintain alignment',
      'Start with shorter holds and build up time'
    ],
    variations: [
      'Side planks for obliques',
      'Plank with leg lifts',
      'Plank to push-up transitions',
      'Reverse plank for posterior chain'
    ],
    duration: 30,
    calories: 25,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['isometric', 'core', 'stability']
  },
  {
    name: 'Burpees',
    description: 'A full-body exercise that combines strength and cardio. Excellent for building endurance and burning calories.',
    category: 'cardio',
    difficulty: 'intermediate',
    equipment: 'none',
    targetMuscles: ['full-body', 'cardio'],
    instructions: [
      'Start standing with feet shoulder-width apart',
      'Drop into a squat and place hands on the ground',
      'Jump feet back into a plank position',
      'Perform a push-up (optional)',
      'Jump feet back to squat position',
      'Explode up with a jump, reaching arms overhead'
    ],
    tips: [
      'Land softly on your feet',
      'Keep your core engaged throughout',
      'Modify by stepping instead of jumping',
      'Focus on form over speed'
    ],
    variations: [
      'Half burpees without push-up',
      'Burpee box jumps',
      'Single-arm burpees',
      'Burpee broad jumps'
    ],
    duration: 45,
    calories: 60,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['full-body', 'cardio', 'high-intensity']
  },
  {
    name: 'Deadlifts',
    description: 'A compound exercise that targets the posterior chain. Excellent for building overall strength and power.',
    category: 'strength',
    difficulty: 'intermediate',
    equipment: 'barbell',
    targetMuscles: ['hamstrings', 'glutes', 'back', 'core'],
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Hinge at hips and bend knees to grip the bar',
      'Keep chest up and shoulders back',
      'Drive through heels and extend hips to lift the bar',
      'Stand tall with shoulders back',
      'Lower the bar by pushing hips back and bending knees'
    ],
    tips: [
      'Keep the bar close to your body',
      'Don\'t round your back',
      'Engage your lats to keep the bar close',
      'Start with lighter weight to master form'
    ],
    variations: [
      'Romanian deadlifts',
      'Sumo deadlifts',
      'Single-leg deadlifts',
      'Trap bar deadlifts'
    ],
    duration: 90,
    calories: 80,
    image: 'https://images.unsplash.com/photo-1583500178690-f7fd39d8ba93?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['compound', 'strength', 'posterior-chain']
  },
  {
    name: 'Mountain Climbers',
    description: 'A dynamic cardio exercise that targets the core while providing cardiovascular benefits.',
    category: 'cardio',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: ['core', 'shoulders', 'cardio'],
    instructions: [
      'Start in a plank position with hands under shoulders',
      'Bring one knee toward your chest',
      'Quickly switch legs, bringing the other knee forward',
      'Continue alternating legs in a running motion',
      'Keep your core engaged and hips level'
    ],
    tips: [
      'Keep your hands firmly planted',
      'Don\'t let your hips bounce up and down',
      'Start slowly and build up speed',
      'Breathe rhythmically'
    ],
    variations: [
      'Slow mountain climbers for beginners',
      'Cross-body mountain climbers',
      'Mountain climber to push-up',
      'Elevated mountain climbers'
    ],
    duration: 30,
    calories: 45,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['cardio', 'core', 'dynamic']
  },
  {
    name: 'Lunges',
    description: 'A unilateral lower body exercise that improves balance, coordination, and leg strength.',
    category: 'strength',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg, lowering your hips',
      'Lower until both knees are bent at 90 degrees',
      'Keep your front knee over your ankle',
      'Push back to starting position',
      'Repeat on the other side'
    ],
    tips: [
      'Keep your torso upright',
      'Don\'t let your front knee go past your toes',
      'Step far enough forward for proper form',
      'Control the movement - don\'t bounce'
    ],
    variations: [
      'Reverse lunges',
      'Walking lunges',
      'Lateral lunges',
      'Jumping lunges'
    ],
    duration: 60,
    calories: 50,
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['unilateral', 'lower-body', 'balance']
  },
  {
    name: 'Pull-ups',
    description: 'An upper body pulling exercise that targets the back, biceps, and core. Excellent for building pulling strength.',
    category: 'strength',
    difficulty: 'advanced',
    equipment: 'pull-up-bar',
    targetMuscles: ['back', 'biceps', 'shoulders', 'core'],
    instructions: [
      'Hang from a pull-up bar with palms facing away',
      'Start with arms fully extended',
      'Pull your body up until your chin clears the bar',
      'Lower yourself back down with control',
      'Repeat for desired repetitions'
    ],
    tips: [
      'Engage your core throughout the movement',
      'Don\'t swing or use momentum',
      'Focus on pulling with your back muscles',
      'Use assistance bands if needed'
    ],
    variations: [
      'Assisted pull-ups with bands',
      'Chin-ups with palms facing in',
      'Wide-grip pull-ups',
      'Negative pull-ups for beginners'
    ],
    duration: 45,
    calories: 55,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    videoUrl: '',
    tags: ['pulling', 'upper-body', 'advanced']
  }
];

// Exercise categories for seeding
export const exerciseCategories = [
  {
    name: 'strength',
    type: 'exercise',
    description: 'Strength training exercises',
    color: '#DC2626'
  },
  {
    name: 'cardio',
    type: 'exercise',
    description: 'Cardiovascular exercises',
    color: '#EF4444'
  },
  {
    name: 'core',
    type: 'exercise',
    description: 'Core strengthening exercises',
    color: '#F87171'
  },
  {
    name: 'flexibility',
    type: 'exercise',
    description: 'Flexibility and mobility exercises',
    color: '#FCA5A5'
  },
  {
    name: 'balance',
    type: 'exercise',
    description: 'Balance and stability exercises',
    color: '#FECACA'
  }
];

export default { exerciseSeeds, exerciseCategories };
