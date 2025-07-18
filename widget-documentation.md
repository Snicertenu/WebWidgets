# Widget Documentation

## Overview
This document provides comprehensive documentation for all web widgets in this project.

## Available Widgets

### 1. News Ticker Widget
- **File**: `news-ticker-core.js`
- **Description**: Displays scrolling news headlines
- **Features**: Auto-scrolling, pause on hover, customizable speed
- **Usage**: `new NewsTicker(container, options)`

### 2. Video Widget
- **File**: `video-widget-core.js`
- **Description**: Embeds and displays videos from various platforms
- **Features**: YouTube, Vimeo, Dailymotion support, responsive design
- **Usage**: `new VideoWidget(container, options)`

### 3. Nutrition Calculator Widget
- **File**: `nutrition-calculator-core.js`
- **Description**: Calculates nutrition information for food items
- **Features**: USDA API integration, BMR/TDEE calculations
- **Usage**: `new NutritionCalculator(container, options)`

### 4. Calendar Widget
- **File**: `calendar-widget-core.js`
- **Description**: Interactive calendar with event management
- **Features**: Month navigation, event display, holiday integration
- **Usage**: `new CalendarWidget(container, options)`

### 5. Music Player Widget
- **File**: `music-player-core.js`
- **Description**: Music player with playlist support
- **Features**: Spotify/YouTube integration, volume control, progress tracking
- **Usage**: `new MusicPlayer(container, options)`

## Installation

1. Include the widget JavaScript file
2. Include the corresponding CSS file
3. Add the HTML structure to your page
4. Initialize the widget with desired options

## Configuration

Each widget accepts configuration options:

```javascript
// Example configuration
const widget = new WidgetName(container, {
  // Widget-specific options
  speed: 50,
  autoplay: false,
  apiKey: 'your-api-key'
});
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- No external dependencies required
- Optional: API keys for enhanced functionality

## License

MIT License - see LICENSE file for details
