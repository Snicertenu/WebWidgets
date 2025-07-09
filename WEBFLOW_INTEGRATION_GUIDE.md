# Webflow Integration Guide

This guide shows you how to integrate the widgets with Webflow's HTML embed code feature.

## 🎯 **Webflow-Specific Optimizations**

The Webflow versions include:
- **Unique IDs**: All elements have `-webflow` suffixes to avoid conflicts
- **Scoped CSS**: All styles are contained within the widget
- **IIFE JavaScript**: Immediately Invoked Function Expressions to avoid global scope pollution
- **DOM Ready Checks**: Proper initialization for Webflow's dynamic loading
- **Responsive Design**: Mobile-optimized layouts
- **Error Handling**: Robust error checking for Webflow's environment

## 📋 **How to Add Widgets to Webflow**

### Step 1: Add HTML Embed Element
1. In your Webflow project, add an **HTML Embed** element to your page
2. Position it where you want the widget to appear
3. Click on the HTML Embed element to open the code editor

### Step 2: Copy and Paste Code
Copy the entire content from one of these files:
- `webflow-weather-widget.html`
- `webflow-timezone-widget.html`
- `webflow-timeline-widget.html`
- `webflow-fema-widget.html`

### Step 3: Configure API Keys (Weather Widget Only)
For the weather widget, you'll need to set up API keys:

1. **OpenWeatherMap (Recommended):**
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Find this line in the code: `openWeatherMap: 'YOUR_OPENWEATHERMAP_API_KEY'`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key

2. **AccuWeather (Optional):**
   - Get an API key from [AccuWeather Developer Portal](https://developer.accuweather.com/)
   - Replace `'YOUR_ACCUWEATHER_API_KEY'` with your actual API key

### Step 4: Publish Your Site
The widgets will work immediately after publishing your Webflow site.

## 🎨 **Widget-Specific Instructions**

### Weather Widget
```html
<!-- Copy the entire content from webflow-weather-widget.html -->
<!-- No additional setup required for timezone and timeline widgets -->
```

**Features:**
- Multiple weather service support
- Local weather detection
- Responsive design
- Error handling

### Timezone Widget
```html
<!-- Copy the entire content from webflow-timezone-widget.html -->
<!-- Works immediately - no API keys needed -->
```

**Features:**
- Real-time updates every second
- 24hr/12hr format selector
- DST support
- Mobile responsive

### Timeline Widget
```html
<!-- Copy the entire content from webflow-timeline-widget.html -->
<!-- Works immediately - no API keys needed -->
```

**Features:**
- Interactive accordion
- Expand/collapse all functionality
- Status indicators
- Smooth animations

### FEMA Disaster Declarations Widget
```html
<!-- Copy the entire content from webflow-fema-widget.html -->
<!-- Works immediately - no API keys needed -->
```

**Features:**
- Fetches and displays US disaster declarations from OpenFEMA
- Search, state/type filters, and sort (newest/oldest)
- Paginated results (10 per page), scrollable area
- Displays disaster number (with link), state, type, title, and date
- Disaster number links to the official FEMA disaster page

## 🔧 **Customization Options**

### Change Widget Colors
Find the CSS variables in the `<style>` section and modify:

```css
/* Weather Widget Colors */
.weather-widget-header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}

/* Timezone Widget Colors */
.timezone-widget-header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}

/* Timeline Widget Colors */
.timeline-widget-header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### Change Widget Size
Modify the max-width in the main container:

```css
.weather-widget-webflow {
    max-width: 350px; /* Adjust as needed */
}

.timezone-widget-webflow {
    max-width: 450px; /* Adjust as needed */
}

.timeline-widget-webflow {
    max-width: 550px; /* Adjust as needed */
}
```

### Add More Timezones
In the timezone widget, modify the timezones object:

```javascript
this.timezones = {
    'EST': 'America/New_York',
    'CST': 'America/Chicago', 
    'MST': 'America/Denver',
    'PST': 'America/Los_Angeles',
    'GMT': 'Europe/London', // Add more
    'JST': 'Asia/Tokyo'     // Add more
};
```

### Customize Timeline Data
In the timeline widget, modify the timelineData array:

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

## 📱 **Responsive Design**

All widgets are fully responsive and will work on:
- **Desktop**: Full functionality with optimal layout
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Single-column layouts, touch-friendly controls

### Mobile Breakpoints
The widgets automatically adjust at:
- **480px and below**: Mobile-optimized layout
- **Above 480px**: Desktop/tablet layout

## 🚀 **Performance Tips**

### Optimize Loading
1. **Place widgets strategically**: Don't overload pages with too many widgets
2. **Use lazy loading**: Consider loading widgets only when needed
3. **Minimize API calls**: Weather widget makes API calls only when requested

### Webflow-Specific Optimizations
1. **Use Webflow's built-in responsive features**: The widgets work with Webflow's responsive breakpoints
2. **Leverage Webflow's hosting**: Widgets are optimized for Webflow's CDN
3. **Test on published site**: Always test widgets on the published version

## 🛠️ **Troubleshooting**

### Common Issues

1. **Widget not appearing:**
   - Check that you copied the entire code (HTML, CSS, and JavaScript)
   - Ensure the HTML Embed element is properly placed
   - Verify the code is saved in the HTML Embed element

2. **Weather not working:**
   - Verify your API key is correct
   - Check browser console for error messages
   - Ensure your Webflow site is published

3. **Styling conflicts:**
   - The widgets use scoped CSS to avoid conflicts
   - If issues persist, check for conflicting CSS in your Webflow project

4. **JavaScript errors:**
   - Open browser developer tools (F12)
   - Check the Console tab for error messages
   - Ensure all code is properly copied

### Browser Compatibility
The widgets work in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📞 **Support**

### Webflow-Specific Support
1. **Webflow Community**: Check the Webflow forum for HTML embed questions
2. **Webflow Documentation**: Review Webflow's HTML embed documentation
3. **Browser Testing**: Test on multiple browsers and devices

### Widget Support
1. **API Keys**: Ensure weather API keys are valid and active
2. **Code Validation**: Use browser developer tools to check for errors
3. **Responsive Testing**: Test on different screen sizes

## 🔄 **Updates and Maintenance**

### Keeping Widgets Updated
1. **API Changes**: Monitor weather API providers for changes
2. **Browser Updates**: Test widgets after major browser updates
3. **Webflow Updates**: Verify compatibility after Webflow platform updates

### Backup Your Code
1. **Save widget code**: Keep copies of your widget code
2. **Version control**: Track changes to your widget configurations
3. **Test before updating**: Always test changes on a staging environment

## 📄 **License and Usage**

These Webflow-optimized widgets are:
- **Free to use** for personal and commercial projects
- **Compatible** with Webflow's terms of service
- **Self-contained** with no external dependencies (except weather APIs)
- **Customizable** to match your brand and design

## 🎯 **Best Practices**

1. **Test thoroughly**: Always test widgets on published Webflow sites
2. **Optimize for mobile**: Ensure widgets work well on mobile devices
3. **Monitor performance**: Keep an eye on page load times
4. **Update regularly**: Keep API keys and code up to date
5. **Backup configurations**: Save your customizations

The Webflow-optimized widgets are designed to work seamlessly with Webflow's platform while maintaining all the functionality of the original widgets. 