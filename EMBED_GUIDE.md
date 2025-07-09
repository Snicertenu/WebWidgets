# Widget Embed Guide

This guide shows you how to embed the widgets on any website using iframes or direct code integration.

## 🌐 Embedding Methods

### Method 1: Iframe Embed (Easiest)

Simply copy and paste these iframe codes into your HTML:

#### Weather Widget
```html
<iframe src="embed-weather-widget.html" width="400" height="500" frameborder="0" scrolling="no"></iframe>
```

#### Timezone Widget
```html
<iframe src="embed-timezone-widget.html" width="500" height="400" frameborder="0" scrolling="no"></iframe>
```

#### Timeline Widget
```html
<iframe src="embed-timeline-widget.html" width="600" height="600" frameborder="0" scrolling="no"></iframe>
```

#### FEMA Disaster Declarations Widget
```html
<iframe src="embed-fema-widget.html" width="700" height="500" frameborder="0" scrolling="yes"></iframe>
```

### Method 2: Direct Code Integration

Copy the entire content of `embed-fema-widget.html` and paste it directly into your website.

## 📋 Setup Instructions

### 1. Weather Widget Setup

**For OpenWeatherMap (Recommended):**
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `embed-weather-widget.html`
3. Find this line: `openWeatherMap: 'YOUR_OPENWEATHERMAP_API_KEY'`
4. Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key

**For AccuWeather:**
1. Get an API key from [AccuWeather Developer Portal](https://developer.accuweather.com/)
2. Replace `'YOUR_ACCUWEATHER_API_KEY'` with your actual API key

### 2. Timezone Widget Setup

**No setup required!** The timezone widget works immediately without any API keys.

### 3. Timeline Widget Setup

**No setup required!** The timeline widget works immediately with sample data.

## 🎨 Customization Options

### Weather Widget Customization

#### Change Widget Size
```css
.weather-widget-embed {
    max-width: 350px; /* Adjust width */
    margin: 10px auto; /* Adjust margins */
}
```

#### Change Colors
```css
.weather-widget-header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

#### Change Font
```css
.weather-widget-embed {
    font-family: 'Your Font', sans-serif;
}
```

### Timezone Widget Customization

#### Add More Timezones
```javascript
this.timezones = {
    'EST': 'America/New_York',
    'CST': 'America/Chicago', 
    'MST': 'America/Denver',
    'PST': 'America/Los_Angeles',
    'GMT': 'Europe/London', // Add more timezones
    'JST': 'Asia/Tokyo'
};
```

#### Change Grid Layout
```css
.timezone-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns instead of 2 */
}
```

### Timeline Widget Customization

#### Change Timeline Data
```javascript
this.timelineData = [
    {
        id: 1,
        date: '2024',
        title: 'Your Event',
        description: 'Your description',
        details: 'Your detailed description',
        status: 'completed', // 'completed', 'active', or 'pending'
        icon: '🎉' // Any emoji
    }
    // Add more items...
];
```

#### Change Colors
```css
.timeline-item.completed {
    border-left: 4px solid #your-color;
}

.timeline-item.active {
    border-left: 4px solid #your-color;
}

.timeline-item.pending {
    border-left: 4px solid #your-color;
}
```

### FEMA Widget Customization

- The FEMA widget is fully self-contained and requires no API key.
- You can adjust the max-width, colors, and font in the `<style>` section of `embed-fema-widget.html`.
- Each disaster number is a clickable link to the official FEMA disaster page.

## 📱 Responsive Design

All widgets are fully responsive and will work on:
- Desktop computers
- Tablets
- Mobile phones
- Any screen size

### Mobile Optimization
The widgets automatically adjust for mobile devices:
- Smaller fonts and spacing
- Single-column layouts where appropriate
- Touch-friendly buttons and controls

## 🔧 Advanced Integration

### WordPress Integration

1. **Using HTML Block:**
   - Add an HTML block to your page
   - Paste the iframe code

2. **Using Custom HTML Widget:**
   - Go to Appearance > Widgets
   - Add a Custom HTML widget
   - Paste the iframe code

### Shopify Integration

1. **In Product Pages:**
   - Go to Online Store > Themes
   - Edit your theme
   - Add the iframe code to product templates

2. **In Blog Posts:**
   - Use the HTML editor in blog posts
   - Paste the iframe code

### Wix Integration

1. **Using HTML Embed:**
   - Add an HTML embed element
   - Paste the iframe code

### Squarespace Integration

1. **Using Code Block:**
   - Add a Code block to your page
   - Paste the iframe code

## 🚀 Performance Tips

### Optimize Loading
```html
<!-- Add loading="lazy" for better performance -->
<iframe src="embed-weather-widget.html" loading="lazy" width="400" height="500" frameborder="0"></iframe>
```

### Reduce iframe Height
If you want to hide scrollbars, adjust the height:
```html
<iframe src="embed-weather-widget.html" width="400" height="450" frameborder="0" scrolling="no"></iframe>
```

## 🛠️ Troubleshooting

### Common Issues

1. **Widget not loading:**
   - Check if the embed file is in the same directory
   - Verify the file path is correct

2. **Weather not working:**
   - Ensure you've set up your API key correctly
   - Check browser console for error messages

3. **Styling conflicts:**
   - The widgets use scoped CSS to avoid conflicts
   - If issues persist, wrap the iframe in a container with specific styling

### Browser Compatibility

The widgets work in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📞 Support

If you need help with embedding or customization:
1. Check the browser console for error messages
2. Verify your API keys are correct
3. Test with different browsers
4. Ensure your hosting supports iframes

## 📄 License

These embed widgets are free to use for personal and commercial projects. Attribution is appreciated but not required. 