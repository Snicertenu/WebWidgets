# Widget Embed Guides

## Overview
This guide explains how to embed widgets into various platforms and websites.

## General Embed Process

### 1. Include Required Files
```html
<!-- Include widget CSS -->
<link rel="stylesheet" href="widget-styling.css">

<!-- Include widget JavaScript -->
<script src="widget-core.js"></script>
```

### 2. Add HTML Structure
```html
<div class="widget-container" data-widget="widget-name">
  <!-- Widget content will be loaded here -->
</div>
```

### 3. Initialize Widget
```javascript
// Initialize widget
const widget = new WidgetName(container, options);
```

## Platform-Specific Guides

### WordPress
1. Upload widget files to your theme directory
2. Enqueue scripts and styles in `functions.php`
3. Add widget HTML to your template
4. Initialize widget in footer

### Shopify
1. Upload files to Assets folder
2. Include in theme.liquid
3. Add widget HTML to product/page templates
4. Initialize in theme.js

### Wix
1. Upload files via File Manager
2. Add HTML element to page
3. Include scripts in page settings
4. Initialize widget

### Squarespace
1. Upload files via File Manager
2. Add Code Block element
3. Include widget HTML and scripts
4. Initialize widget

## Responsive Design

All widgets are responsive and work on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Customization

### CSS Customization
```css
/* Override widget styles */
.widget-container {
  /* Your custom styles */
}
```

### JavaScript Customization
```javascript
// Extend widget functionality
const widget = new WidgetName(container, {
  // Custom options
  onEvent: function(data) {
    // Custom event handling
  }
});
```

## Troubleshooting

### Common Issues
1. **Widget not loading**: Check file paths and console errors
2. **Styling issues**: Ensure CSS is loaded before HTML
3. **JavaScript errors**: Verify script loading order
4. **API issues**: Check API keys and network connectivity

### Debug Mode
Enable debug mode for troubleshooting:
```javascript
const widget = new WidgetName(container, {
  debug: true
});
```

## Performance Tips

1. Load widgets asynchronously
2. Use CDN for better performance
3. Minimize API calls
4. Cache widget data when possible
5. Lazy load non-critical widgets

## Security Considerations

1. Validate all user inputs
2. Sanitize API responses
3. Use HTTPS for API calls
4. Implement rate limiting
5. Secure API keys properly
