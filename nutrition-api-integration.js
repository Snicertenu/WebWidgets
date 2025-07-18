// Nutrition API Integration
// Create USDA API integration for nutrition data

class NutritionAPI {
  constructor(apiKey = '') {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.nal.usda.gov/fdc/v1';
  }

  async searchFood(query) {
    try {
      const response = await fetch(`${this.baseUrl}/foods/search?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.foods || [];
    } catch (error) {
      console.error('Failed to search food:', error);
      return [];
    }
  }

  async getFoodDetails(fdcId) {
    try {
      const response = await fetch(`${this.baseUrl}/food/${fdcId}?api_key=${this.apiKey}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to get food details:', error);
      return null;
    }
  }

  calculateNutrition(foodData) {
    const nutrients = foodData.foodNutrients || [];
    return {
      calories: this.findNutrient(nutrients, 'Calories'),
      protein: this.findNutrient(nutrients, 'Protein'),
      carbs: this.findNutrient(nutrients, 'Carbohydrate, by difference'),
      fat: this.findNutrient(nutrients, 'Total lipid (fat)'),
      fiber: this.findNutrient(nutrients, 'Fiber, total dietary'),
      sugar: this.findNutrient(nutrients, 'Sugars, total including NLEA')
    };
  }

  findNutrient(nutrients, name) {
    const nutrient = nutrients.find(n => n.nutrientName === name);
    return nutrient ? nutrient.value : 0;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NutritionAPI;
}