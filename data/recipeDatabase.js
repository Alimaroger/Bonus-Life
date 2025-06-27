// 🍳 Complex Recipe Database
// Professional recipe collection with detailed nutritional analysis

export const recipeCategories = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACKS: 'snacks',
  SMOOTHIES: 'smoothies',
  SALADS: 'salads',
  PROTEIN: 'protein',
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  KETO: 'keto',
  LOW_CARB: 'low-carb',
  HIGH_PROTEIN: 'high-protein'
};

export const difficultyLevels = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const dietaryTags = {
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten-free',
  DAIRY_FREE: 'dairy-free',
  KETO: 'keto',
  PALEO: 'paleo',
  LOW_CARB: 'low-carb',
  HIGH_PROTEIN: 'high-protein',
  LOW_SODIUM: 'low-sodium',
  HEART_HEALTHY: 'heart-healthy'
};

// 🍽️ Comprehensive Recipe Database
export const recipeDatabase = [
  // 🥗 BREAKFAST RECIPES
  {
    id: 'breakfast-001',
    name: 'Protein Power Bowl',
    description: 'High-protein breakfast bowl with Greek yogurt, berries, and nuts',
    category: recipeCategories.BREAKFAST,
    difficulty: difficultyLevels.EASY,
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 1,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&h=400&fit=crop',
    
    ingredients: [
      { name: 'Greek yogurt (plain)', amount: 200, unit: 'g', calories: 130 },
      { name: 'Mixed berries', amount: 100, unit: 'g', calories: 57 },
      { name: 'Almonds (sliced)', amount: 20, unit: 'g', calories: 116 },
      { name: 'Honey', amount: 15, unit: 'ml', calories: 46 },
      { name: 'Chia seeds', amount: 10, unit: 'g', calories: 49 },
      { name: 'Granola', amount: 30, unit: 'g', calories: 134 }
    ],
    
    instructions: [
      'Add Greek yogurt to a bowl as the base',
      'Top with mixed berries evenly',
      'Sprinkle sliced almonds and chia seeds',
      'Add granola for crunch',
      'Drizzle honey on top',
      'Serve immediately for best texture'
    ],
    
    nutrition: {
      calories: 532,
      protein: 23.5,
      carbs: 52.8,
      fat: 18.2,
      fiber: 8.4,
      sugar: 38.6,
      sodium: 65
    },
    
    dietaryTags: [dietaryTags.VEGETARIAN, dietaryTags.HIGH_PROTEIN],
    healthScore: 88,
    
    tips: [
      'Use frozen berries for a thicker consistency',
      'Prepare chia seeds overnight for better texture',
      'Choose low-sugar granola for healthier option'
    ],
    
    variations: [
      'Replace honey with maple syrup for vegan option',
      'Add protein powder for extra protein boost',
      'Use coconut yogurt for dairy-free version'
    ]
  },

  {
    id: 'breakfast-002',
    name: 'Avocado Toast Supreme',
    description: 'Nutrient-dense avocado toast with poached egg and microgreens',
    category: recipeCategories.BREAKFAST,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    servings: 1,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=400&fit=crop',
    
    ingredients: [
      { name: 'Whole grain bread', amount: 2, unit: 'slices', calories: 160 },
      { name: 'Avocado (ripe)', amount: 1, unit: 'medium', calories: 234 },
      { name: 'Egg (large)', amount: 1, unit: 'piece', calories: 70 },
      { name: 'Lemon juice', amount: 5, unit: 'ml', calories: 1 },
      { name: 'Microgreens', amount: 10, unit: 'g', calories: 3 },
      { name: 'Sea salt', amount: 1, unit: 'pinch', calories: 0 },
      { name: 'Black pepper', amount: 1, unit: 'pinch', calories: 0 },
      { name: 'Red pepper flakes', amount: 1, unit: 'pinch', calories: 0 }
    ],
    
    instructions: [
      'Toast bread slices until golden brown',
      'Bring water to boil for poaching egg',
      'Mash avocado with lemon juice, salt, and pepper',
      'Create whirlpool in boiling water and add egg',
      'Poach egg for 3-4 minutes until whites are set',
      'Spread avocado mixture on toast',
      'Top with poached egg and microgreens',
      'Sprinkle with red pepper flakes'
    ],
    
    nutrition: {
      calories: 468,
      protein: 18.2,
      carbs: 34.5,
      fat: 28.7,
      fiber: 12.8,
      sugar: 3.2,
      sodium: 320
    },
    
    dietaryTags: [dietaryTags.VEGETARIAN, dietaryTags.HEART_HEALTHY],
    healthScore: 92,
    
    tips: [
      'Use very fresh eggs for best poaching results',
      'Add vinegar to poaching water to help egg whites stay together',
      'Choose ripe but firm avocado for best texture'
    ]
  },

  // 🥙 LUNCH RECIPES
  {
    id: 'lunch-001',
    name: 'Mediterranean Quinoa Bowl',
    description: 'Colorful quinoa bowl with Mediterranean vegetables and tahini dressing',
    category: recipeCategories.LUNCH,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    
    ingredients: [
      { name: 'Quinoa (dry)', amount: 100, unit: 'g', calories: 368 },
      { name: 'Cucumber', amount: 150, unit: 'g', calories: 24 },
      { name: 'Cherry tomatoes', amount: 200, unit: 'g', calories: 36 },
      { name: 'Red onion', amount: 50, unit: 'g', calories: 20 },
      { name: 'Kalamata olives', amount: 40, unit: 'g', calories: 59 },
      { name: 'Feta cheese', amount: 60, unit: 'g', calories: 159 },
      { name: 'Fresh parsley', amount: 20, unit: 'g', calories: 7 },
      { name: 'Tahini', amount: 30, unit: 'g', calories: 178 },
      { name: 'Lemon juice', amount: 30, unit: 'ml', calories: 7 },
      { name: 'Olive oil', amount: 15, unit: 'ml', calories: 119 },
      { name: 'Garlic', amount: 2, unit: 'cloves', calories: 8 }
    ],
    
    instructions: [
      'Rinse quinoa and cook in 2:1 water ratio for 15 minutes',
      'Let quinoa cool to room temperature',
      'Dice cucumber, tomatoes, and red onion',
      'Crumble feta cheese and chop parsley',
      'Make dressing: whisk tahini, lemon juice, olive oil, minced garlic',
      'Combine quinoa with vegetables in large bowl',
      'Add feta cheese and parsley',
      'Drizzle with tahini dressing and toss gently',
      'Let flavors meld for 10 minutes before serving'
    ],
    
    nutrition: {
      calories: 492,
      protein: 18.4,
      carbs: 45.2,
      fat: 26.8,
      fiber: 6.8,
      sugar: 8.4,
      sodium: 445
    },
    
    dietaryTags: [dietaryTags.VEGETARIAN, dietaryTags.HEART_HEALTHY],
    healthScore: 89
  },

  // 🍗 DINNER RECIPES
  {
    id: 'dinner-001',
    name: 'Herb-Crusted Salmon with Roasted Vegetables',
    description: 'Omega-3 rich salmon with colorful roasted vegetables',
    category: recipeCategories.DINNER,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    
    ingredients: [
      { name: 'Salmon fillet', amount: 300, unit: 'g', calories: 412 },
      { name: 'Broccoli', amount: 200, unit: 'g', calories: 68 },
      { name: 'Bell peppers (mixed)', amount: 150, unit: 'g', calories: 45 },
      { name: 'Zucchini', amount: 150, unit: 'g', calories: 25 },
      { name: 'Fresh dill', amount: 10, unit: 'g', calories: 4 },
      { name: 'Fresh parsley', amount: 10, unit: 'g', calories: 4 },
      { name: 'Lemon zest', amount: 5, unit: 'g', calories: 1 },
      { name: 'Olive oil', amount: 20, unit: 'ml', calories: 159 },
      { name: 'Garlic', amount: 3, unit: 'cloves', calories: 12 },
      { name: 'Sea salt', amount: 2, unit: 'g', calories: 0 },
      { name: 'Black pepper', amount: 1, unit: 'g', calories: 3 }
    ],
    
    instructions: [
      'Preheat oven to 200°C (400°F)',
      'Cut vegetables into uniform pieces',
      'Toss vegetables with half the olive oil, salt, and pepper',
      'Arrange vegetables on baking sheet and roast for 15 minutes',
      'Mix herbs, lemon zest, garlic, remaining oil for herb crust',
      'Season salmon with salt and pepper',
      'Spread herb mixture on top of salmon',
      'Add salmon to baking sheet with vegetables',
      'Bake for 12-15 minutes until salmon flakes easily',
      'Let rest for 5 minutes before serving'
    ],
    
    nutrition: {
      calories: 366,
      protein: 42.8,
      carbs: 12.4,
      fat: 16.8,
      fiber: 5.2,
      sugar: 8.1,
      sodium: 245
    },
    
    dietaryTags: [dietaryTags.HIGH_PROTEIN, dietaryTags.HEART_HEALTHY, dietaryTags.KETO],
    healthScore: 95
  },

  // 🥤 SMOOTHIE RECIPES
  {
    id: 'smoothie-001',
    name: 'Green Goddess Smoothie',
    description: 'Nutrient-packed green smoothie with spinach, banana, and protein',
    category: recipeCategories.SMOOTHIES,
    difficulty: difficultyLevels.EASY,
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 1,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=400&fit=crop',
    
    ingredients: [
      { name: 'Fresh spinach', amount: 60, unit: 'g', calories: 14 },
      { name: 'Banana (frozen)', amount: 120, unit: 'g', calories: 107 },
      { name: 'Mango (frozen)', amount: 80, unit: 'g', calories: 48 },
      { name: 'Protein powder (vanilla)', amount: 30, unit: 'g', calories: 110 },
      { name: 'Almond milk (unsweetened)', amount: 250, unit: 'ml', calories: 37 },
      { name: 'Chia seeds', amount: 10, unit: 'g', calories: 49 },
      { name: 'Fresh ginger', amount: 5, unit: 'g', calories: 4 },
      { name: 'Lemon juice', amount: 10, unit: 'ml', calories: 2 }
    ],
    
    instructions: [
      'Add liquid ingredients to blender first',
      'Add frozen fruits and spinach',
      'Add protein powder and chia seeds',
      'Add fresh ginger and lemon juice',
      'Blend on high for 60-90 seconds until smooth',
      'Add ice if thinner consistency desired',
      'Pour into glass and serve immediately'
    ],
    
    nutrition: {
      calories: 371,
      protein: 28.2,
      carbs: 42.8,
      fat: 8.4,
      fiber: 9.6,
      sugar: 28.4,
      sodium: 145
    },
    
    dietaryTags: [dietaryTags.VEGAN, dietaryTags.HIGH_PROTEIN, dietaryTags.DAIRY_FREE],
    healthScore: 91
  },

  // 🥗 SALAD RECIPES
  {
    id: 'salad-001',
    name: 'Power Kale Caesar Salad',
    description: 'Nutrient-dense kale Caesar with homemade dressing and chickpea croutons',
    category: recipeCategories.SALADS,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',

    ingredients: [
      { name: 'Kale (massaged)', amount: 150, unit: 'g', calories: 52 },
      { name: 'Chickpeas (cooked)', amount: 200, unit: 'g', calories: 328 },
      { name: 'Parmesan cheese', amount: 40, unit: 'g', calories: 157 },
      { name: 'Greek yogurt', amount: 60, unit: 'g', calories: 39 },
      { name: 'Lemon juice', amount: 30, unit: 'ml', calories: 7 },
      { name: 'Olive oil', amount: 15, unit: 'ml', calories: 119 },
      { name: 'Garlic', amount: 2, unit: 'cloves', calories: 8 },
      { name: 'Dijon mustard', amount: 5, unit: 'g', calories: 3 },
      { name: 'Anchovy paste', amount: 3, unit: 'g', calories: 4 }
    ],

    nutrition: {
      calories: 358,
      protein: 19.8,
      carbs: 32.4,
      fat: 16.2,
      fiber: 11.8,
      sugar: 6.2,
      sodium: 385
    },

    dietaryTags: [dietaryTags.VEGETARIAN, dietaryTags.HIGH_PROTEIN],
    healthScore: 87
  },

  // 🍖 HIGH PROTEIN RECIPES
  {
    id: 'protein-001',
    name: 'Lean Turkey Meatballs with Zucchini Noodles',
    description: 'High-protein turkey meatballs served over spiralized zucchini',
    category: recipeCategories.PROTEIN,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 3,
    image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=600&h=400&fit=crop',

    ingredients: [
      { name: 'Ground turkey (lean)', amount: 400, unit: 'g', calories: 448 },
      { name: 'Zucchini (large)', amount: 300, unit: 'g', calories: 51 },
      { name: 'Egg white', amount: 1, unit: 'large', calories: 17 },
      { name: 'Almond flour', amount: 30, unit: 'g', calories: 178 },
      { name: 'Marinara sauce (low sodium)', amount: 200, unit: 'ml', calories: 70 },
      { name: 'Fresh basil', amount: 15, unit: 'g', calories: 3 },
      { name: 'Garlic powder', amount: 2, unit: 'g', calories: 6 },
      { name: 'Italian seasoning', amount: 2, unit: 'g', calories: 5 }
    ],

    nutrition: {
      calories: 259,
      protein: 32.4,
      carbs: 8.6,
      fat: 10.8,
      fiber: 3.2,
      sugar: 6.4,
      sodium: 245
    },

    dietaryTags: [dietaryTags.HIGH_PROTEIN, dietaryTags.LOW_CARB, dietaryTags.GLUTEN_FREE],
    healthScore: 89
  },

  // 🥜 SNACK RECIPES
  {
    id: 'snack-001',
    name: 'Energy Protein Balls',
    description: 'No-bake protein balls with dates, nuts, and seeds',
    category: recipeCategories.SNACKS,
    difficulty: difficultyLevels.EASY,
    prepTime: 15,
    cookTime: 0,
    totalTime: 15,
    servings: 12,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',

    ingredients: [
      { name: 'Medjool dates (pitted)', amount: 200, unit: 'g', calories: 533 },
      { name: 'Almonds (raw)', amount: 100, unit: 'g', calories: 579 },
      { name: 'Protein powder (vanilla)', amount: 60, unit: 'g', calories: 220 },
      { name: 'Chia seeds', amount: 20, unit: 'g', calories: 97 },
      { name: 'Coconut flakes', amount: 30, unit: 'g', calories: 187 },
      { name: 'Vanilla extract', amount: 5, unit: 'ml', calories: 12 },
      { name: 'Sea salt', amount: 1, unit: 'pinch', calories: 0 }
    ],

    nutrition: {
      calories: 137,
      protein: 6.8,
      carbs: 12.4,
      fat: 7.2,
      fiber: 3.8,
      sugar: 8.6,
      sodium: 15
    },

    dietaryTags: [dietaryTags.VEGAN, dietaryTags.GLUTEN_FREE, dietaryTags.HIGH_PROTEIN],
    healthScore: 84
  },

  // 🌱 VEGAN RECIPES
  {
    id: 'vegan-001',
    name: 'Buddha Bowl with Tahini Dressing',
    description: 'Colorful vegan bowl with roasted vegetables and protein-rich tahini sauce',
    category: recipeCategories.VEGETARIAN,
    difficulty: difficultyLevels.MEDIUM,
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',

    ingredients: [
      { name: 'Sweet potato', amount: 200, unit: 'g', calories: 172 },
      { name: 'Chickpeas (cooked)', amount: 150, unit: 'g', calories: 246 },
      { name: 'Red cabbage', amount: 100, unit: 'g', calories: 31 },
      { name: 'Carrots', amount: 100, unit: 'g', calories: 41 },
      { name: 'Quinoa (cooked)', amount: 150, unit: 'g', calories: 172 },
      { name: 'Tahini', amount: 30, unit: 'g', calories: 178 },
      { name: 'Lemon juice', amount: 20, unit: 'ml', calories: 5 },
      { name: 'Maple syrup', amount: 10, unit: 'ml', calories: 26 },
      { name: 'Pumpkin seeds', amount: 20, unit: 'g', calories: 110 }
    ],

    nutrition: {
      calories: 490,
      protein: 18.6,
      carbs: 62.8,
      fat: 18.4,
      fiber: 12.2,
      sugar: 14.8,
      sodium: 125
    },

    dietaryTags: [dietaryTags.VEGAN, dietaryTags.GLUTEN_FREE, dietaryTags.HEART_HEALTHY],
    healthScore: 92
  }
];

// 🔍 Helper Functions
export const getRecipesByCategory = (category) => {
  return recipeDatabase.filter(recipe => recipe.category === category);
};

export const getRecipesByDifficulty = (difficulty) => {
  return recipeDatabase.filter(recipe => recipe.difficulty === difficulty);
};

export const getRecipesByDietaryTag = (tag) => {
  return recipeDatabase.filter(recipe => recipe.dietaryTags.includes(tag));
};

export const getRecipeById = (id) => {
  return recipeDatabase.find(recipe => recipe.id === id);
};

export const searchRecipes = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return recipeDatabase.filter(recipe =>
    recipe.name.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(lowercaseQuery)
    )
  );
};

export const getRecipesByTime = (maxTime) => {
  return recipeDatabase.filter(recipe => recipe.totalTime <= maxTime);
};

export const getHighProteinRecipes = (minProtein = 20) => {
  return recipeDatabase.filter(recipe => recipe.nutrition.protein >= minProtein);
};

export const getLowCalorieRecipes = (maxCalories = 400) => {
  return recipeDatabase.filter(recipe => recipe.nutrition.calories <= maxCalories);
};

export const getRecipeRecommendations = (userPreferences = {}) => {
  let filtered = recipeDatabase;
  
  if (userPreferences.dietaryTags) {
    filtered = filtered.filter(recipe =>
      userPreferences.dietaryTags.some(tag => recipe.dietaryTags.includes(tag))
    );
  }
  
  if (userPreferences.maxTime) {
    filtered = filtered.filter(recipe => recipe.totalTime <= userPreferences.maxTime);
  }
  
  if (userPreferences.difficulty) {
    filtered = filtered.filter(recipe => recipe.difficulty === userPreferences.difficulty);
  }
  
  return filtered.sort((a, b) => b.healthScore - a.healthScore);
};

// 📊 Recipe Statistics
export const getRecipeStats = () => {
  return {
    total: recipeDatabase.length,
    byCategory: Object.values(recipeCategories).reduce((acc, category) => {
      acc[category] = getRecipesByCategory(category).length;
      return acc;
    }, {}),
    byDifficulty: Object.values(difficultyLevels).reduce((acc, difficulty) => {
      acc[difficulty] = getRecipesByDifficulty(difficulty).length;
      return acc;
    }, {}),
    averageHealthScore: Math.round(
      recipeDatabase.reduce((sum, recipe) => sum + recipe.healthScore, 0) / recipeDatabase.length
    ),
    averageCalories: Math.round(
      recipeDatabase.reduce((sum, recipe) => sum + recipe.nutrition.calories, 0) / recipeDatabase.length
    )
  };
};
