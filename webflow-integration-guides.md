# Webflow Integration Guides

## Overview
This guide explains how to integrate widgets into Webflow websites.

## Webflow-Specific Setup

### 1. Upload Files
1. Go to your Webflow project
2. Navigate to Project Settings > Custom Code
3. Upload widget files to Assets
4. Note the file URLs for reference

### 2. Add Custom Code
```html
<!-- Add to Page Settings > Custom Code > Head -->
<link rel="stylesheet" href="widget-styling.css">

<!-- Add to Page Settings > Custom Code > Before </body> -->
<script src="widget-core.js"></script>
```

### 3. Create Widget Container
1. Add a Div element to your page
2. Set class to `widget-container`
3. Add data attribute: `data-widget="widget-name"`
4. Style container as needed

### 4. Initialize Widget
```javascript
// Add to Page Settings > Custom Code > Before </body>
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('[data-widget="widget-name"]');
  if (container) {
    new WidgetName(container, {
      // Widget options
    });
  }
});
```

## Widget-Specific Integration

### News Ticker Widget
```html
<!-- HTML Structure -->
<div class="news-ticker-container">
  <div class="news-ticker" data-widget="news-ticker">
    <div class="ticker-content">
      <span class="ticker-item">Loading news...</span>
    </div>
  </div>
</div>
```

### Video Widget
```html
<!-- HTML Structure -->
<div class="video-widget-container" data-widget="video-widget">
  <!-- Video will be loaded here -->
</div>
```

### Nutrition Calculator Widget
```html
<!-- HTML Structure -->
<div class="nutrition-calculator-container">
  <div class="nutrition-calculator" data-widget="nutrition-calculator">
    <h3>Nutrition Calculator</h3>
    <div class="input-group">
      <label for="food-input">Food Item:</label>
      <input type="text" id="food-input" placeholder="Enter food item...">
      <button id="calculate-btn">Calculate</button>
    </div>
    <div class="results" id="nutrition-results"></div>
  </div>
</div>
```

### Calendar Widget
```html
<!-- HTML Structure -->
<div class="calendar-widget-container">
  <div class="calendar-widget" data-widget="calendar-widget">
    <div class="calendar-header">
      <button class="nav-btn" id="prev-month">&lt;</button>
      <h3 id="month-year"></h3>
      <button class="nav-btn" id="next-month">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div class="weekdays">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>
      <div class="days" id="calendar-days"></div>
    </div>
    <div class="events-list" id="events-list"></div>
  </div>
</div>
```

### Music Player Widget
```html
<!-- HTML Structure -->
<div class="music-player-container">
  <div class="music-player" data-widget="music-player">
    <div class="player-header">
      <h3>Music Player</h3>
    </div>
    <div class="player-content">
      <div class="track-info">
        <div class="track-title" id="track-title">No track selected</div>
        <div class="track-artist" id="track-artist">-</div>
      </div>
      <div class="controls">
        <button class="control-btn" id="prev-btn">⏮</button>
        <button class="control-btn play-btn" id="play-btn">▶</button>
        <button class="control-btn" id="next-btn">⏭</button>
      </div>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="time-display">
          <span id="current-time">0:00</span>
          <span id="total-time">0:00</span>
        </div>
      </div>
      <div class="volume-control">
        <span>🔊</span>
        <input type="range" id="volume-slider" min="0" max="100" value="70">
      </div>
    </div>
    <div class="playlist" id="playlist"></div>
  </div>
</div>
```

## Styling in Webflow

### Custom CSS Classes
```css
/* Add to Page Settings > Custom Code > Head */
.widget-container {
  /* Your custom styles */
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.widget-container h3 {
  /* Custom heading styles */
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}
```

### Responsive Design
```css
/* Mobile styles */
@media (max-width: 768px) {
  .widget-container {
    margin: 10px 0;
  }
  
  .widget-container h3 {
    font-size: 16px;
  }
}
```

## Advanced Configuration

### Environment Variables
```javascript
// Configure API keys and settings
const widgetConfig = {
  apiKey: 'your-api-key',
  debug: false,
  theme: 'light'
};
```

### Event Handling
```javascript
// Handle widget events
const widget = new WidgetName(container, {
  onLoad: function() {
    console.log('Widget loaded');
  },
  onError: function(error) {
    console.error('Widget error:', error);
  }
});
```

## Troubleshooting

### Common Webflow Issues
1. **Scripts not loading**: Check file paths and permissions
2. **Styling conflicts**: Use more specific CSS selectors
3. **Widget not initializing**: Verify DOM ready state
4. **API errors**: Check CORS and API key configuration

### Debug Mode
```javascript
// Enable debug mode
const widget = new WidgetName(container, {
  debug: true,
  logLevel: 'verbose'
});
```

## Performance Optimization

1. **Minimize HTTP requests**: Combine CSS/JS files
2. **Use Webflow's CDN**: Upload assets to Webflow
3. **Lazy load widgets**: Load only when needed
4. **Cache API responses**: Reduce API calls
5. **Optimize images**: Use Webflow's image optimization

## Security Best Practices

1. **Validate inputs**: Sanitize user data
2. **Secure API keys**: Use environment variables
3. **HTTPS only**: Ensure all requests use HTTPS
4. **Rate limiting**: Implement API call limits
5. **Error handling**: Graceful error recovery
