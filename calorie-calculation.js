// Nutrition Calculator Styling
// Create nutrition-calculator-styling.css with responsive form design, validation styling, and results display. Include .calculator-form, .input-group, .results-display classes

class NutritionCalculator {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      apiKey: options.apiKey || '',
      units: options.units || 'metric',
      ...options
    };
    this.init();
  }

  init() {
    this.createCalculatorInterface();
    this.setupEventListeners();
  }

  createCalculatorInterface() {
    this.container.innerHTML = `
      <div class="nutrition-calculator">
        <h3>Nutrition Calculator</h3>
        <div class="input-group">
          <label for="food-input">Food Item:</label>
          <input type="text" id="food-input" placeholder="Enter food item...">
          <button id="calculate-btn">Calculate</button>
        </div>
        <div class="results" id="nutrition-results"></div>
      </div>
    `;
  }

  setupEventListeners() {
    const calculateBtn = this.container.querySelector('#calculate-btn');
    const foodInput = this.container.querySelector('#food-input');
    
    calculateBtn.addEventListener('click', () => {
      this.calculateNutrition(foodInput.value);
    });
    
    foodInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.calculateNutrition(foodInput.value);
      }
    });
  }

  async calculateNutrition(foodItem) {
    if (!foodItem.trim()) {
      this.showError('Please enter a food item');
      return;
    }

    try {
      const response = await fetch(`/api/nutrition?food=${encodeURIComponent(foodItem)}`);
      const data = await response.json();
      this.displayResults(data);
    } catch (error) {
      console.error('Failed to calculate nutrition:', error);
      this.showError('Failed to calculate nutrition. Please try again.');
    }
  }

  displayResults(nutritionData) {
    const resultsDiv = this.container.querySelector('#nutrition-results');
    
    resultsDiv.innerHTML = `
      <div class="nutrition-info">
        <h4>Nutrition Information</h4>
        <div class="nutrition-grid">
          <div class="nutrition-item">
            <span class="label">Calories:</span>
            <span class="value">${nutritionData.calories || 'N/A'}</span>
          </div>
          <div class="nutrition-item">
            <span class="label">Protein:</span>
            <span class="value">${nutritionData.protein || 'N/A'}g</span>
          </div>
          <div class="nutrition-item">
            <span class="label">Carbs:</span>
            <span class="value">${nutritionData.carbs || 'N/A'}g</span>
          </div>
          <div class="nutrition-item">
            <span class="label">Fat:</span>
            <span class="value">${nutritionData.fat || 'N/A'}g</span>
          </div>
        </div>
      </div>
    `;
  }

  showError(message) {
    const resultsDiv = this.container.querySelector('#nutrition-results');
    resultsDiv.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NutritionCalculator;
}