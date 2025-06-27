// 🍎 Advanced Food Analysis Service
// Simulates AI-powered food recognition with realistic results

class FoodAnalysisService {
  constructor() {
    // Mock food database with detailed nutritional information
    this.foodDatabase = {
      'apple': {
        name: 'Apple',
        category: 'fruit',
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
        fiber: 2.4,
        sugar: 10.4,
        sodium: 1,
        potassium: 107,
        vitamins: {
          'Vitamin C': 4.6,
          'Vitamin A': 54,
          'Vitamin K': 2.2
        },
        minerals: {
          'Calcium': 6,
          'Iron': 0.12,
          'Magnesium': 5
        },
        confidence: 0.95
      },
      'banana': {
        name: 'Banana',
        category: 'fruit',
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3,
        fiber: 2.6,
        sugar: 12.2,
        sodium: 1,
        potassium: 358,
        vitamins: {
          'Vitamin C': 8.7,
          'Vitamin B6': 0.4,
          'Folate': 20
        },
        minerals: {
          'Magnesium': 27,
          'Manganese': 0.3
        },
        confidence: 0.92
      },
      'chicken_breast': {
        name: 'Chicken Breast',
        category: 'protein',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74,
        potassium: 256,
        vitamins: {
          'Niacin': 14.8,
          'Vitamin B6': 0.9,
          'Vitamin B12': 0.3
        },
        minerals: {
          'Phosphorus': 196,
          'Selenium': 22.5
        },
        confidence: 0.88
      },
      'broccoli': {
        name: 'Broccoli',
        category: 'vegetable',
        calories: 34,
        protein: 2.8,
        carbs: 7,
        fat: 0.4,
        fiber: 2.6,
        sugar: 1.5,
        sodium: 33,
        potassium: 316,
        vitamins: {
          'Vitamin C': 89.2,
          'Vitamin K': 101.6,
          'Folate': 63
        },
        minerals: {
          'Calcium': 47,
          'Iron': 0.7,
          'Magnesium': 21
        },
        confidence: 0.91
      },
      'rice': {
        name: 'White Rice',
        category: 'grain',
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3,
        fiber: 0.4,
        sugar: 0.1,
        sodium: 1,
        potassium: 55,
        vitamins: {
          'Thiamine': 0.2,
          'Niacin': 1.6
        },
        minerals: {
          'Iron': 0.8,
          'Magnesium': 12
        },
        confidence: 0.85
      },
      'salmon': {
        name: 'Salmon',
        category: 'protein',
        calories: 208,
        protein: 25.4,
        carbs: 0,
        fat: 12.4,
        fiber: 0,
        sugar: 0,
        sodium: 59,
        potassium: 363,
        vitamins: {
          'Vitamin D': 11,
          'Vitamin B12': 2.8,
          'Niacin': 8.5
        },
        minerals: {
          'Selenium': 22.5,
          'Phosphorus': 200
        },
        omega3: 1.8,
        confidence: 0.89
      },
      'avocado': {
        name: 'Avocado',
        category: 'fruit',
        calories: 160,
        protein: 2,
        carbs: 9,
        fat: 15,
        fiber: 7,
        sugar: 0.7,
        sodium: 7,
        potassium: 485,
        vitamins: {
          'Vitamin K': 21,
          'Folate': 81,
          'Vitamin C': 10
        },
        minerals: {
          'Magnesium': 29,
          'Potassium': 485
        },
        confidence: 0.93
      }
    };

    // Food recognition patterns (simulated AI)
    this.recognitionPatterns = [
      { keywords: ['red', 'round', 'fruit'], food: 'apple', confidence: 0.85 },
      { keywords: ['yellow', 'curved', 'fruit'], food: 'banana', confidence: 0.90 },
      { keywords: ['white', 'meat', 'protein'], food: 'chicken_breast', confidence: 0.80 },
      { keywords: ['green', 'tree', 'vegetable'], food: 'broccoli', confidence: 0.88 },
      { keywords: ['white', 'grain', 'rice'], food: 'rice', confidence: 0.75 },
      { keywords: ['pink', 'fish', 'salmon'], food: 'salmon', confidence: 0.85 },
      { keywords: ['green', 'creamy', 'avocado'], food: 'avocado', confidence: 0.92 }
    ];
  }

  // Simulate AI food analysis from image
  async analyzeFood(imageBlob) {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        try {
          // Simulate AI analysis with random food detection
          const foods = Object.keys(this.foodDatabase);
          const randomFood = foods[Math.floor(Math.random() * foods.length)];
          const foodData = this.foodDatabase[randomFood];

          // Simulate confidence based on "image quality"
          const baseConfidence = foodData.confidence;
          const imageQualityFactor = 0.8 + (Math.random() * 0.2); // 0.8 to 1.0
          const finalConfidence = Math.min(baseConfidence * imageQualityFactor, 0.99);

          // Simulate portion estimation
          const estimatedPortion = this.estimatePortion(randomFood);

          const result = {
            success: true,
            foods: [{
              ...foodData,
              confidence: finalConfidence,
              portion: estimatedPortion,
              nutritionPer100g: this.getNutritionPer100g(foodData),
              nutritionPerPortion: this.calculatePortionNutrition(foodData, estimatedPortion.grams)
            }],
            analysisTime: Math.random() * 2 + 1, // 1-3 seconds
            imageQuality: imageQualityFactor,
            suggestions: this.getFoodSuggestions(randomFood)
          };

          resolve(result);
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to analyze food image',
            suggestions: ['Ensure good lighting', 'Position food clearly', 'Try a different angle']
          });
        }
      }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
    });
  }

  // Estimate portion size based on food type
  estimatePortion(foodKey) {
    const portionSizes = {
      'apple': { grams: 182, description: '1 medium apple' },
      'banana': { grams: 118, description: '1 medium banana' },
      'chicken_breast': { grams: 85, description: '3 oz serving' },
      'broccoli': { grams: 91, description: '1 cup chopped' },
      'rice': { grams: 158, description: '1 cup cooked' },
      'salmon': { grams: 85, description: '3 oz fillet' },
      'avocado': { grams: 150, description: '1 medium avocado' }
    };

    return portionSizes[foodKey] || { grams: 100, description: '100g serving' };
  }

  // Get nutrition per 100g
  getNutritionPer100g(foodData) {
    return {
      calories: foodData.calories,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fat: foodData.fat,
      fiber: foodData.fiber,
      sugar: foodData.sugar,
      sodium: foodData.sodium,
      potassium: foodData.potassium
    };
  }

  // Calculate nutrition for specific portion
  calculatePortionNutrition(foodData, portionGrams) {
    const factor = portionGrams / 100;
    
    return {
      calories: Math.round(foodData.calories * factor),
      protein: Math.round(foodData.protein * factor * 10) / 10,
      carbs: Math.round(foodData.carbs * factor * 10) / 10,
      fat: Math.round(foodData.fat * factor * 10) / 10,
      fiber: Math.round(foodData.fiber * factor * 10) / 10,
      sugar: Math.round(foodData.sugar * factor * 10) / 10,
      sodium: Math.round(foodData.sodium * factor),
      potassium: Math.round(foodData.potassium * factor)
    };
  }

  // Get food suggestions and alternatives
  getFoodSuggestions(foodKey) {
    const suggestions = {
      'apple': [
        'Try pairing with almond butter for protein',
        'Great source of fiber and vitamin C',
        'Consider organic varieties for less pesticides'
      ],
      'banana': [
        'Perfect pre-workout snack for quick energy',
        'High in potassium for muscle function',
        'Pair with protein for balanced nutrition'
      ],
      'chicken_breast': [
        'Excellent lean protein source',
        'Try grilling or baking for healthier preparation',
        'Season with herbs instead of salt'
      ],
      'broccoli': [
        'Steam lightly to preserve nutrients',
        'High in vitamin C and antioxidants',
        'Great addition to any meal'
      ],
      'rice': [
        'Consider brown rice for more fiber',
        'Good source of energy for workouts',
        'Portion control is important'
      ],
      'salmon': [
        'Rich in omega-3 fatty acids',
        'Great for heart and brain health',
        'Wild-caught is often preferred'
      ],
      'avocado': [
        'Healthy fats support nutrient absorption',
        'Great for heart health',
        'Use in moderation due to high calories'
      ]
    };

    return suggestions[foodKey] || [
      'Ensure proper portion sizes',
      'Balance with other food groups',
      'Consider preparation methods'
    ];
  }

  // Get similar foods for recommendations
  getSimilarFoods(foodKey) {
    const similarFoods = {
      'apple': ['pear', 'orange', 'berries'],
      'banana': ['mango', 'peach', 'grapes'],
      'chicken_breast': ['turkey_breast', 'lean_beef', 'fish'],
      'broccoli': ['cauliflower', 'brussels_sprouts', 'spinach'],
      'rice': ['quinoa', 'brown_rice', 'oats'],
      'salmon': ['tuna', 'mackerel', 'sardines'],
      'avocado': ['nuts', 'olive_oil', 'seeds']
    };

    return similarFoods[foodKey] || [];
  }

  // Analyze multiple foods in one image
  async analyzeMultipleFoods(imageBlob) {
    const singleResult = await this.analyzeFood(imageBlob);
    
    if (!singleResult.success) return singleResult;

    // Simulate detecting multiple foods (30% chance)
    if (Math.random() > 0.7) {
      const additionalFoods = Object.keys(this.foodDatabase);
      const secondFood = additionalFoods[Math.floor(Math.random() * additionalFoods.length)];
      
      if (secondFood !== Object.keys(this.foodDatabase)[0]) {
        const secondFoodData = this.foodDatabase[secondFood];
        const secondPortion = this.estimatePortion(secondFood);
        
        singleResult.foods.push({
          ...secondFoodData,
          confidence: secondFoodData.confidence * 0.8, // Lower confidence for second food
          portion: secondPortion,
          nutritionPer100g: this.getNutritionPer100g(secondFoodData),
          nutritionPerPortion: this.calculatePortionNutrition(secondFoodData, secondPortion.grams)
        });
      }
    }

    return singleResult;
  }
}

// Export singleton instance
const foodAnalysisService = new FoodAnalysisService();

// Main export function
export const analyzeFood = (imageBlob) => {
  return foodAnalysisService.analyzeFood(imageBlob);
};

// Additional export functions
export const analyzeMultipleFoods = (imageBlob) => {
  return foodAnalysisService.analyzeMultipleFoods(imageBlob);
};

export const getFoodDatabase = () => {
  return foodAnalysisService.foodDatabase;
};

export default foodAnalysisService;
