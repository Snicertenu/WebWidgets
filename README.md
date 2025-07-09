# Widget Testing Dashboard

A simple web page for testing various web widgets with a modern, responsive design.

## Features

### 🌤️ Weather Widget
- Get weather information for any location or use your current location
- Supports multiple weather services: OpenWeatherMap, AccuWeather, Weather Channel, and Windy
- Displays temperature, weather description, humidity, wind speed, and pressure
- Beautiful weather icons for different conditions
- Service selector to choose your preferred weather data source

### 🕐 Multi-Time Zone Clock
- Shows current time in EST, CST, MST, and PST timezones
- Automatically accounts for Daylight Saving Time
- Updates every second in real-time
- Time format selector (24-hour or 12-hour display)
- Clean, easy-to-read display

### 📅 Vertical Timeline Accordion
- Interactive timeline with expandable sections
- Status indicators (Completed, In Progress, Pending)
- Expand/Collapse all functionality
- Beautiful visual design with icons and animations
- Responsive layout for all devices

### 🏛️ FEMA Disaster Declarations Widget
- Fetches and displays US disaster declarations from the OpenFEMA API
- Search bar, state/type filters, and sort (newest/oldest)
- Paginated results (10 per page), scrollable area
- Displays disaster number (with link), state, type, title, and date
- Disaster number links to the official FEMA disaster page
- Modular JavaScript version (`fema-widget.js`), embeddable HTML (`embed-fema-widget.html`), and Webflow-optimized (`webflow-fema-widget.html`)

## Setup Instructions

### 1. Weather Widget Setup
The weather widget supports multiple services. You can choose which one to use:

#### OpenWeatherMap (Recommended - Free)
1. Go to [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Open `weather-widget.js`
5. Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key

#### AccuWeather (Professional)
1. Go to [AccuWeather Developer Portal](https://developer.accuweather.com/)
2. Sign up for an account
3. Get your API key
4. Replace `'YOUR_ACCUWEATHER_API_KEY'` in `weather-widget.js`

#### Weather Channel (IBM Weather)
1. Go to [IBM Environmental Intelligence Suite](https://www.ibm.com/products/environmental-intelligence-suite)
2. Sign up for an account
3. Get your API key
4. Replace `'YOUR_WEATHERCHANNEL_API_KEY'` in `weather-widget.js`

#### Windy (Demo - Limited)
- Currently in demo mode with limited functionality
- Always returns New York weather regardless of input location
- For full functionality, requires API key from [Windy API](https://api.windy.com/)
- Requires geocoding service to convert city names to coordinates

```javascript
// In weather-widget.js, update the apiKeys object:
this.apiKeys = {
    openWeatherMap: 'your_openweathermap_api_key',
    accuWeather: 'your_accuweather_api_key',
    weatherChannel: 'your_weatherchannel_api_key'
};
```

### 2. Running the Page
Simply open `index.html` in your web browser. No server setup required!

## Setup Instructions (FEMA Widget)

### 1. Modular JavaScript Widget (fema-widget.js)
1. Add `<div id="fema-widget"></div>` where you want the widget
2. Include `<script src="fema-widget.js"></script>` before the closing `</body>`
3. Initialize with `<script>initFemaWidget('fema-widget');</script>`

### 2. Embeddable HTML Widget
- Use `embed-fema-widget.html` as an iframe or direct embed (see Embed Guide)

### 3. Webflow-Optimized Widget
- Use `webflow-fema-widget.html` in a Webflow HTML Embed (see Webflow Integration Guide)

## File Structure

```
├── index.html          # Main HTML page
├── styles.css          # CSS styles for the page and widgets
├── weather-widget.js   # Weather widget functionality
├── timezone-widget.js  # Multi-timezone clock widget
├── timeline-widget.js  # Vertical timeline accordion widget
├── main.js            # Global functionality and initialization
├── fema-widget.js           # Modular FEMA widget for any site
├── embed-fema-widget.html   # Standalone embeddable FEMA widget
├── webflow-fema-widget.html # Webflow-optimized FEMA widget
└── README.md          # This file
```

## Widget Features

### Weather Widget
- **Service Selection**: Choose from OpenWeatherMap, AccuWeather, Weather Channel, or Windy
- **Location Input**: Enter any city name or leave blank for local weather
- **Current Location**: Automatically detects your location (requires permission)
- **Weather Details**: Temperature, feels like, humidity, wind speed, pressure
- **Weather Icons**: Visual representation of weather conditions
- **Error Handling**: Graceful error messages for invalid locations
- **Service Display**: Shows which weather service provided the data

### Timezone Widget
- **Real-time Updates**: Updates every second
- **DST Support**: Automatically adjusts for Daylight Saving Time
- **Multiple Zones**: EST, CST, MST, PST
- **Time Format**: Choose between 24-hour and 12-hour display
- **Date Display**: Shows current date for each timezone

### Timeline Widget
- **Interactive Accordion**: Click to expand/collapse timeline items
- **Status Indicators**: Visual status badges (Completed, In Progress, Pending)
- **Bulk Actions**: Expand All and Collapse All buttons
- **Visual Design**: Timeline with icons, markers, and connecting lines
- **Responsive**: Works perfectly on mobile and desktop
- **Animations**: Smooth expand/collapse animations

## Keyboard Shortcuts

- `Ctrl/Cmd + R`: Reload the page
- `Ctrl/Cmd + 1`: Focus the weather location input

## Browser Compatibility

This page works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Geolocation API (for local weather)
- Fetch API (for weather data)

## Customization

### Adding New Widgets
1. Create a new JavaScript file for your widget
2. Add the widget HTML to `index.html`
3. Add corresponding CSS styles to `styles.css`
4. Initialize the widget in `main.js`

### Styling
The page uses a modern design with:
- Gradient backgrounds
- Card-based layout
- Hover effects
- Responsive design
- Inter font family

## API Usage

The weather widget supports multiple APIs:

### OpenWeatherMap
- Current weather: `https://api.openweathermap.org/data/2.5/weather`
- Units: Metric (Celsius)
- Rate limit: 60 calls/minute for free tier

### AccuWeather
- Current conditions: `http://dataservice.accuweather.com/currentconditions/v1`
- Location search: `http://dataservice.accuweather.com/locations/v1/cities/search`
- Rate limit: Varies by plan

### Weather Channel (IBM)
- Requires additional geocoding setup
- Professional weather data
- Rate limit: Varies by plan

### Windy
- Demo mode with limited functionality
- Always returns New York weather data
- Requires API key for full functionality
- Needs geocoding service for location search

## License

This project is open source and available under the MIT License. 