// 📊 Barcode Lookup Service
// Simulates product database lookup with realistic food products

class BarcodeService {
  constructor() {
    // Mock product database with real-world barcodes and products
    this.productDatabase = {
      '0123456789012': {
        name: 'Coca-Cola Classic',
        brand: 'Coca-Cola',
        category: 'beverages',
        size: '355ml',
        servingSize: '355ml',
        servingsPerContainer: 1,
        calories: 140,
        protein: 0,
        carbs: 39,
        fat: 0,
        fiber: 0,
        sugar: 39,
        sodium: 45,
        potassium: 0,
        ingredients: ['Carbonated water', 'High fructose corn syrup', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
        allergens: [],
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop'
      },
      '0987654321098': {
        name: 'Organic Gala Apples',
        brand: 'Fresh Farms',
        category: 'fruits',
        size: '1 medium (182g)',
        servingSize: '182g',
        servingsPerContainer: 1,
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        fiber: 4.4,
        sugar: 19,
        sodium: 2,
        potassium: 195,
        vitamins: {
          'Vitamin C': 8.4,
          'Vitamin A': 98
        },
        ingredients: ['Organic apples'],
        allergens: [],
        organic: true,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
      },
      '1234567890123': {
        name: 'Premium Bananas',
        brand: 'Tropical Best',
        category: 'fruits',
        size: '1 medium (118g)',
        servingSize: '118g',
        servingsPerContainer: 1,
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4,
        fiber: 3.1,
        sugar: 14.4,
        sodium: 1,
        potassium: 422,
        vitamins: {
          'Vitamin C': 10.3,
          'Vitamin B6': 0.5,
          'Folate': 24
        },
        ingredients: ['Fresh bananas'],
        allergens: [],
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
      },
      '9876543210987': {
        name: 'Boneless Skinless Chicken Breast',
        brand: 'Farm Fresh',
        category: 'meat',
        size: '4 oz (113g)',
        servingSize: '113g',
        servingsPerContainer: 1,
        calories: 186,
        protein: 35,
        carbs: 0,
        fat: 4,
        fiber: 0,
        sugar: 0,
        sodium: 84,
        potassium: 289,
        vitamins: {
          'Niacin': 16.7,
          'Vitamin B6': 1.0,
          'Vitamin B12': 0.3
        },
        ingredients: ['Chicken breast'],
        allergens: [],
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop'
      },
      '5555555555555': {
        name: 'Whole Wheat Bread',
        brand: 'Healthy Grains',
        category: 'bakery',
        size: '2 slices (56g)',
        servingSize: '56g',
        servingsPerContainer: 10,
        calories: 160,
        protein: 8,
        carbs: 28,
        fat: 2.5,
        fiber: 6,
        sugar: 4,
        sodium: 320,
        potassium: 180,
        vitamins: {
          'Thiamine': 0.2,
          'Niacin': 3.2,
          'Folate': 40
        },
        ingredients: ['Whole wheat flour', 'Water', 'Yeast', 'Salt', 'Honey'],
        allergens: ['Wheat', 'Gluten'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop'
      },
      '1111111111111': {
        name: 'Greek Yogurt Plain',
        brand: 'Mountain Valley',
        category: 'dairy',
        size: '1 cup (245g)',
        servingSize: '245g',
        servingsPerContainer: 1,
        calories: 130,
        protein: 23,
        carbs: 9,
        fat: 0,
        fiber: 0,
        sugar: 9,
        sodium: 65,
        potassium: 240,
        vitamins: {
          'Calcium': 230,
          'Vitamin B12': 1.3
        },
        ingredients: ['Cultured pasteurized nonfat milk', 'Live active cultures'],
        allergens: ['Milk'],
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=300&h=300&fit=crop'
      },
      '2222222222222': {
        name: 'Atlantic Salmon Fillet',
        brand: 'Ocean Fresh',
        category: 'seafood',
        size: '6 oz (170g)',
        servingSize: '170g',
        servingsPerContainer: 1,
        calories: 354,
        protein: 43.2,
        carbs: 0,
        fat: 21.1,
        fiber: 0,
        sugar: 0,
        sodium: 100,
        potassium: 617,
        omega3: 3.1,
        vitamins: {
          'Vitamin D': 18.7,
          'Vitamin B12': 4.8,
          'Niacin': 14.5
        },
        ingredients: ['Fresh Atlantic salmon'],
        allergens: ['Fish'],
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=300&fit=crop'
      },
      '3333333333333': {
        name: 'Organic Brown Rice',
        brand: 'Nature\'s Best',
        category: 'grains',
        size: '1 cup cooked (195g)',
        servingSize: '195g',
        servingsPerContainer: 8,
        calories: 216,
        protein: 5,
        carbs: 45,
        fat: 1.8,
        fiber: 3.5,
        sugar: 0.7,
        sodium: 10,
        potassium: 84,
        vitamins: {
          'Thiamine': 0.2,
          'Niacin': 3.0,
          'Magnesium': 84
        },
        ingredients: ['Organic brown rice'],
        allergens: [],
        organic: true,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop'
      }
    };

    // Barcode format validation patterns
    this.barcodePatterns = {
      UPC: /^\d{12}$/,
      EAN13: /^\d{13}$/,
      EAN8: /^\d{8}$/,
      CODE128: /^[A-Za-z0-9\-\.\ \$\/\+\%]+$/
    };
  }

  // Main barcode lookup function
  async lookupBarcode(barcode) {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          // Validate barcode format
          if (!this.isValidBarcode(barcode)) {
            resolve({
              success: false,
              error: 'Invalid barcode format',
              barcode: barcode
            });
            return;
          }

          // Check if product exists in database
          const product = this.productDatabase[barcode];
          
          if (product) {
            resolve({
              success: true,
              barcode: barcode,
              product: {
                ...product,
                nutritionFacts: this.generateNutritionFacts(product),
                healthScore: this.calculateHealthScore(product),
                recommendations: this.getRecommendations(product)
              },
              lookupTime: Math.random() * 1 + 0.5 // 0.5-1.5 seconds
            });
          } else {
            // Simulate external API lookup (would fail in real scenario)
            resolve({
              success: false,
              error: 'Product not found in database',
              barcode: barcode,
              suggestions: [
                'Try manual entry',
                'Check barcode is clearly visible',
                'Product may not be in our database yet'
              ]
            });
          }
        } catch (error) {
          resolve({
            success: false,
            error: 'Lookup service temporarily unavailable',
            barcode: barcode
          });
        }
      }, 800 + Math.random() * 700); // 0.8-1.5 seconds
    });
  }

  // Validate barcode format
  isValidBarcode(barcode) {
    if (!barcode || typeof barcode !== 'string') return false;
    
    return Object.values(this.barcodePatterns).some(pattern => 
      pattern.test(barcode.trim())
    );
  }

  // Generate detailed nutrition facts
  generateNutritionFacts(product) {
    const facts = {
      servingSize: product.servingSize,
      servingsPerContainer: product.servingsPerContainer,
      caloriesPerServing: product.calories,
      macronutrients: {
        protein: {
          grams: product.protein,
          calories: product.protein * 4,
          percentDV: Math.round((product.protein / 50) * 100) // Based on 2000 cal diet
        },
        carbohydrates: {
          grams: product.carbs,
          calories: product.carbs * 4,
          percentDV: Math.round((product.carbs / 300) * 100)
        },
        fat: {
          grams: product.fat,
          calories: product.fat * 9,
          percentDV: Math.round((product.fat / 65) * 100)
        }
      },
      micronutrients: {
        fiber: {
          grams: product.fiber,
          percentDV: Math.round((product.fiber / 25) * 100)
        },
        sugar: {
          grams: product.sugar,
          percentDV: null // No DV for sugar
        },
        sodium: {
          mg: product.sodium,
          percentDV: Math.round((product.sodium / 2300) * 100)
        },
        potassium: {
          mg: product.potassium,
          percentDV: Math.round((product.potassium / 3500) * 100)
        }
      }
    };

    // Add vitamins if present
    if (product.vitamins) {
      facts.vitamins = product.vitamins;
    }

    return facts;
  }

  // Calculate health score (0-100)
  calculateHealthScore(product) {
    let score = 50; // Base score

    // Positive factors
    if (product.protein > 10) score += 15;
    if (product.fiber > 3) score += 10;
    if (product.organic) score += 10;
    if (product.omega3 && product.omega3 > 1) score += 15;
    if (product.sodium < 140) score += 10; // Low sodium
    
    // Negative factors
    if (product.sugar > 15) score -= 15;
    if (product.sodium > 600) score -= 20; // High sodium
    if (product.calories > 300) score -= 10;
    if (product.fat > 20) score -= 10;

    // Category bonuses
    if (product.category === 'fruits' || product.category === 'vegetables') score += 20;
    if (product.category === 'beverages' && product.sugar > 20) score -= 25;

    return Math.max(0, Math.min(100, score));
  }

  // Get personalized recommendations
  getRecommendations(product) {
    const recommendations = [];
    const healthScore = this.calculateHealthScore(product);

    if (healthScore >= 80) {
      recommendations.push('✅ Great choice! This is a nutritious option.');
    } else if (healthScore >= 60) {
      recommendations.push('👍 Good choice with some nutritional benefits.');
    } else {
      recommendations.push('⚠️ Consider healthier alternatives when possible.');
    }

    // Specific recommendations based on nutrition
    if (product.protein > 15) {
      recommendations.push('💪 High protein content supports muscle health.');
    }
    
    if (product.fiber > 5) {
      recommendations.push('🌾 High fiber content aids digestion.');
    }
    
    if (product.sodium > 600) {
      recommendations.push('🧂 High sodium content - consider limiting intake.');
    }
    
    if (product.sugar > 20) {
      recommendations.push('🍯 High sugar content - enjoy in moderation.');
    }

    if (product.omega3 && product.omega3 > 1) {
      recommendations.push('🐟 Rich in omega-3 fatty acids for heart health.');
    }

    return recommendations;
  }

  // Get alternative products
  getAlternatives(product) {
    const alternatives = [];
    
    // Find products in same category with better health scores
    Object.entries(this.productDatabase).forEach(([barcode, altProduct]) => {
      if (altProduct.category === product.category && 
          this.calculateHealthScore(altProduct) > this.calculateHealthScore(product)) {
        alternatives.push({
          barcode,
          name: altProduct.name,
          brand: altProduct.brand,
          healthScore: this.calculateHealthScore(altProduct),
          reason: 'Better nutritional profile'
        });
      }
    });

    return alternatives.slice(0, 3); // Return top 3 alternatives
  }

  // Batch lookup for multiple barcodes
  async lookupMultipleBarcodes(barcodes) {
    const promises = barcodes.map(barcode => this.lookupBarcode(barcode));
    return Promise.all(promises);
  }

  // Get product suggestions based on category
  getProductSuggestions(category, limit = 5) {
    const products = Object.entries(this.productDatabase)
      .filter(([_, product]) => product.category === category)
      .map(([barcode, product]) => ({
        barcode,
        ...product,
        healthScore: this.calculateHealthScore(product)
      }))
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, limit);

    return products;
  }
}

// Export singleton instance
const barcodeService = new BarcodeService();

// Main export function
export const lookupBarcode = (barcode) => {
  return barcodeService.lookupBarcode(barcode);
};

// Additional export functions
export const lookupMultipleBarcodes = (barcodes) => {
  return barcodeService.lookupMultipleBarcodes(barcodes);
};

export const getProductSuggestions = (category, limit) => {
  return barcodeService.getProductSuggestions(category, limit);
};

export const isValidBarcode = (barcode) => {
  return barcodeService.isValidBarcode(barcode);
};

export default barcodeService;
