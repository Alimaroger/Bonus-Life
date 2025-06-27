// Nutrition Service for Food Scanning and Analysis
// This service can be extended to integrate with real APIs like:
// - USDA FoodData Central API
// - Edamam Food Database API
// - Spoonacular API
// - Nutritionix API

class NutritionService {
  constructor() {
    // Mock food database - In production, this would be API calls
    this.foodDatabase = {
      // Fruits
      'apple': {
        name: 'Apple (Medium, 182g)',
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        fiber: 4,
        sugar: 19,
        sodium: 2,
        vitamins: {
          'Vitamin C': '14% DV',
          'Vitamin K': '5% DV',
          'Vitamin A': '2% DV'
        },
        minerals: {
          'Potassium': '195mg',
          'Manganese': '0.1mg',
          'Copper': '0.04mg'
        },
        category: 'fruit',
        barcode: '123456789'
      },
      'banana': {
        name: 'Banana (Medium, 118g)',
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4,
        fiber: 3,
        sugar: 14,
        sodium: 1,
        vitamins: {
          'Vitamin B6': '20% DV',
          'Vitamin C': '17% DV',
          'Folate': '6% DV'
        },
        minerals: {
          'Potassium': '422mg',
          'Magnesium': '32mg',
          'Manganese': '0.3mg'
        },
        category: 'fruit',
        barcode: '123456790'
      },
      
      // Proteins
      'chicken breast': {
        name: 'Chicken Breast (100g, cooked)',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74,
        vitamins: {
          'Vitamin B6': '30% DV',
          'Niacin': '69% DV',
          'Vitamin B12': '5% DV'
        },
        minerals: {
          'Phosphorus': '196mg',
          'Selenium': '22.5mcg',
          'Zinc': '0.9mg'
        },
        category: 'protein',
        barcode: '123456791'
      },
      'salmon': {
        name: 'Salmon (100g, cooked)',
        calories: 208,
        protein: 25,
        carbs: 0,
        fat: 12,
        fiber: 0,
        sugar: 0,
        sodium: 59,
        vitamins: {
          'Vitamin D': '127% DV',
          'Vitamin B12': '51% DV',
          'Vitamin B6': '20% DV'
        },
        minerals: {
          'Selenium': '36.5mcg',
          'Phosphorus': '252mg',
          'Potassium': '363mg'
        },
        category: 'protein',
        barcode: '123456792'
      },
      
      // Vegetables
      'broccoli': {
        name: 'Broccoli (100g, raw)',
        calories: 34,
        protein: 2.8,
        carbs: 7,
        fat: 0.4,
        fiber: 2.6,
        sugar: 1.5,
        sodium: 33,
        vitamins: {
          'Vitamin C': '149% DV',
          'Vitamin K': '127% DV',
          'Folate': '16% DV'
        },
        minerals: {
          'Potassium': '316mg',
          'Iron': '0.7mg',
          'Calcium': '47mg'
        },
        category: 'vegetable',
        barcode: '123456793'
      },
      'spinach': {
        name: 'Spinach (100g, raw)',
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        fiber: 2.2,
        sugar: 0.4,
        sodium: 79,
        vitamins: {
          'Vitamin K': '604% DV',
          'Vitamin A': '188% DV',
          'Folate': '49% DV'
        },
        minerals: {
          'Iron': '2.7mg',
          'Potassium': '558mg',
          'Magnesium': '79mg'
        },
        category: 'vegetable',
        barcode: '123456794'
      },
      
      // Grains
      'brown rice': {
        name: 'Brown Rice (100g, cooked)',
        calories: 112,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        fiber: 1.8,
        sugar: 0.4,
        sodium: 5,
        vitamins: {
          'Thiamine': '6% DV',
          'Niacin': '8% DV',
          'Vitamin B6': '7% DV'
        },
        minerals: {
          'Manganese': '0.9mg',
          'Phosphorus': '83mg',
          'Magnesium': '43mg'
        },
        category: 'grain',
        barcode: '123456795'
      }
    };
  }

  // Simulate food scanning with camera
  async scanFood(imageData) {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // In real implementation, this would:
        // 1. Send image to computer vision API
        // 2. Identify food items
        // 3. Return nutrition data
        
        const foods = Object.keys(this.foodDatabase);
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        const foodData = this.foodDatabase[randomFood];
        
        resolve({
          success: true,
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          food: foodData,
          alternatives: this.getSimilarFoods(foodData.category, randomFood)
        });
      }, 2000);
    });
  }

  // Search food by name or barcode
  searchFood(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    for (const [key, food] of Object.entries(this.foodDatabase)) {
      if (
        key.includes(searchTerm) ||
        food.name.toLowerCase().includes(searchTerm) ||
        food.barcode === query
      ) {
        results.push({ id: key, ...food });
      }
    }
    
    return results;
  }

  // Get similar foods by category
  getSimilarFoods(category, excludeKey, limit = 3) {
    const similar = [];
    
    for (const [key, food] of Object.entries(this.foodDatabase)) {
      if (food.category === category && key !== excludeKey) {
        similar.push({ id: key, ...food });
      }
    }
    
    return similar.slice(0, limit);
  }

  // Calculate nutrition goals based on user profile
  calculateNutritionGoals(userProfile) {
    const { age, weight, height, gender, activityLevel, goal } = userProfile;
    
    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);
    
    // Adjust calories based on goal
    let targetCalories = tdee;
    if (goal === 'weight-loss') {
      targetCalories = tdee - 500; // 1 lb per week loss
    } else if (goal === 'muscle-gain') {
      targetCalories = tdee + 300; // Lean bulk
    }
    
    // Calculate macros
    const proteinCalories = targetCalories * 0.3;
    const carbCalories = targetCalories * 0.4;
    const fatCalories = targetCalories * 0.3;
    
    return {
      calories: Math.round(targetCalories),
      protein: Math.round(proteinCalories / 4), // 4 cal per gram
      carbs: Math.round(carbCalories / 4),
      fat: Math.round(fatCalories / 9), // 9 cal per gram
      fiber: Math.round(weight * 0.5), // 0.5g per kg body weight
      sugar: Math.round(targetCalories * 0.1 / 4), // Max 10% of calories
      water: Math.round(weight * 35) // 35ml per kg body weight
    };
  }

  // Analyze meal composition
  analyzeMeal(foods) {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0
    };
    
    const vitamins = {};
    const minerals = {};
    
    foods.forEach(({ food, quantity = 1 }) => {
      // Add macros
      Object.keys(totals).forEach(key => {
        totals[key] += (food[key] || 0) * quantity;
      });
      
      // Combine vitamins and minerals
      if (food.vitamins) {
        Object.assign(vitamins, food.vitamins);
      }
      if (food.minerals) {
        Object.assign(minerals, food.minerals);
      }
    });
    
    return {
      totals,
      vitamins,
      minerals,
      analysis: this.getMealAnalysis(totals)
    };
  }

  // Get meal analysis and recommendations
  getMealAnalysis(totals) {
    const analysis = [];
    
    // Protein analysis
    if (totals.protein < 20) {
      analysis.push({
        type: 'warning',
        message: 'Low protein content. Consider adding lean protein sources.'
      });
    } else if (totals.protein > 30) {
      analysis.push({
        type: 'success',
        message: 'Excellent protein content for muscle maintenance.'
      });
    }
    
    // Fiber analysis
    if (totals.fiber < 5) {
      analysis.push({
        type: 'warning',
        message: 'Low fiber content. Add more vegetables or whole grains.'
      });
    }
    
    // Sodium analysis
    if (totals.sodium > 800) {
      analysis.push({
        type: 'warning',
        message: 'High sodium content. Consider reducing processed foods.'
      });
    }
    
    return analysis;
  }

  // Generate meal suggestions based on goals
  generateMealSuggestions(nutritionGoals, currentIntake) {
    const remaining = {
      calories: nutritionGoals.calories - currentIntake.calories,
      protein: nutritionGoals.protein - currentIntake.protein,
      carbs: nutritionGoals.carbs - currentIntake.carbs,
      fat: nutritionGoals.fat - currentIntake.fat
    };
    
    const suggestions = [];
    
    if (remaining.protein > 20) {
      suggestions.push({
        type: 'protein',
        foods: ['chicken breast', 'salmon', 'greek yogurt'],
        reason: `You need ${remaining.protein}g more protein today`
      });
    }
    
    if (remaining.carbs > 30) {
      suggestions.push({
        type: 'carbs',
        foods: ['brown rice', 'sweet potato', 'oats'],
        reason: `You need ${remaining.carbs}g more carbs for energy`
      });
    }
    
    if (remaining.calories > 300) {
      suggestions.push({
        type: 'snack',
        foods: ['apple', 'banana', 'nuts'],
        reason: `You have ${remaining.calories} calories remaining`
      });
    }
    
    return suggestions;
  }
}

export default new NutritionService();
