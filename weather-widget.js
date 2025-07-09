class WeatherWidget {
    constructor() {
        this.apiKeys = {
            openWeatherMap: 'YOUR_OPENWEATHERMAP_API_KEY',
            accuWeather: 'YOUR_ACCUWEATHER_API_KEY',
            weatherChannel: 'YOUR_WEATHERCHANNEL_API_KEY'
        };
        
        this.apiEndpoints = {
            openWeatherMap: 'https://api.openweathermap.org/data/2.5/weather',
            accuWeather: 'http://dataservice.accuweather.com/currentconditions/v1',
            weatherChannel: 'https://api.weather.com/v2/turbo/vt1currentobservation'
        };
        
        this.currentService = 'openWeatherMap'; // Default service
        this.init();
    }

    init() {
        this.locationInput = document.getElementById('location-input');
        this.getWeatherBtn = document.getElementById('get-weather-btn');
        this.weatherDisplay = document.getElementById('weather-display');
        
        // Add service selector
        this.addServiceSelector();
        
        this.getWeatherBtn.addEventListener('click', () => this.getWeather());
        this.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.getWeather();
            }
        });
    }

    addServiceSelector() {
        const serviceSelector = document.createElement('div');
        serviceSelector.className = 'service-selector';
        serviceSelector.innerHTML = `
            <label for="weather-service">Weather Service:</label>
            <select id="weather-service">
                <option value="openWeatherMap">OpenWeatherMap (Free)</option>
                <option value="accuWeather">AccuWeather (API Key Required)</option>
                <option value="weatherChannel">Weather Channel (API Key Required)</option>
                <option value="windy">Windy (Demo - Limited)</option>
            </select>
        `;
        
        // Insert before the location input
        const locationInputContainer = this.locationInput.parentElement;
        locationInputContainer.parentElement.insertBefore(serviceSelector, locationInputContainer);
        
        // Add event listener
        document.getElementById('weather-service').addEventListener('change', (e) => {
            this.currentService = e.target.value;
            this.updateApiKeyNotice();
        });
        
        this.updateApiKeyNotice();
    }

    updateApiKeyNotice() {
        const notice = document.querySelector('.api-key-notice');
        if (notice) {
            const serviceInfo = this.getServiceInfo();
            notice.innerHTML = `
                <strong>${serviceInfo.name}:</strong> ${serviceInfo.description}
                ${serviceInfo.apiKeyRequired ? `<br><a href="${serviceInfo.signupUrl}" target="_blank" style="color: #0056b3;">Get API Key</a>` : ''}
            `;
        }
    }

    getServiceInfo() {
        const services = {
            openWeatherMap: {
                name: 'OpenWeatherMap',
                description: 'Free tier available, 60 calls/minute',
                apiKeyRequired: true,
                signupUrl: 'https://openweathermap.org/api'
            },
            accuWeather: {
                name: 'AccuWeather',
                description: 'Professional weather data, requires API key',
                apiKeyRequired: true,
                signupUrl: 'https://developer.accuweather.com/'
            },
            weatherChannel: {
                name: 'Weather Channel',
                description: 'IBM Weather API, requires API key',
                apiKeyRequired: true,
                signupUrl: 'https://www.ibm.com/products/environmental-intelligence-suite'
            },
            windy: {
                name: 'Windy',
                description: 'Demo mode only - requires API key for full functionality',
                apiKeyRequired: true,
                signupUrl: 'https://api.windy.com/'
            }
        };
        return services[this.currentService];
    }

    async getWeather() {
        const location = this.locationInput.value.trim();
        
        if (!location) {
            this.getLocalWeather();
            return;
        }

        this.showLoading();
        
        try {
            let weatherData;
            
            switch (this.currentService) {
                case 'openWeatherMap':
                    weatherData = await this.getOpenWeatherMapData(location);
                    break;
                case 'accuWeather':
                    weatherData = await this.getAccuWeatherData(location);
                    break;
                case 'weatherChannel':
                    weatherData = await this.getWeatherChannelData(location);
                    break;
                case 'windy':
                    weatherData = await this.getWindyData(location);
                    break;
                default:
                    throw new Error('Invalid weather service selected');
            }
            
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError(error.message);
        }
    }

    async getOpenWeatherMapData(location) {
        const apiKey = this.apiKeys.openWeatherMap;
        if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
            throw new Error('Please set your OpenWeatherMap API key');
        }
        
        const response = await fetch(`${this.apiEndpoints.openWeatherMap}?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: Math.round(data.wind.speed),
            description: data.weather[0].description,
            location: `${data.name}, ${data.sys.country}`,
            weatherId: data.weather[0].id,
            service: 'OpenWeatherMap'
        };
    }

    async getAccuWeatherData(location) {
        const apiKey = this.apiKeys.accuWeather;
        if (apiKey === 'YOUR_ACCUWEATHER_API_KEY') {
            throw new Error('Please set your AccuWeather API key');
        }
        
        // First get location key
        const locationResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(location)}`);
        
        if (!locationResponse.ok) {
            throw new Error('Location not found');
        }
        
        const locationData = await locationResponse.json();
        if (!locationData.length) {
            throw new Error('Location not found');
        }
        
        const locationKey = locationData[0].Key;
        
        // Get weather data
        const weatherResponse = await fetch(`${this.apiEndpoints.accuWeather}/${locationKey}?apikey=${apiKey}&details=true`);
        
        if (!weatherResponse.ok) {
            throw new Error('Failed to get weather data');
        }
        
        const weatherData = await weatherResponse.json();
        const current = weatherData[0];
        
        return {
            temperature: Math.round(current.Temperature.Metric.Value),
            feelsLike: Math.round(current.RealFeelTemperature.Metric.Value),
            humidity: current.RelativeHumidity,
            pressure: Math.round(current.Pressure.Metric.Value),
            windSpeed: Math.round(current.Wind.Speed.Metric.Value),
            description: current.WeatherText,
            location: `${locationData[0].LocalizedName}, ${locationData[0].Country.LocalizedName}`,
            weatherId: current.WeatherIcon,
            service: 'AccuWeather'
        };
    }

    async getWeatherChannelData(location) {
        const apiKey = this.apiKeys.weatherChannel;
        if (apiKey === 'YOUR_WEATHERCHANNEL_API_KEY') {
            throw new Error('Please set your Weather Channel API key');
        }
        
        // Weather Channel API requires geocoding first
        // This is a simplified version - you'd need to implement proper geocoding
        throw new Error('Weather Channel API requires additional setup for geocoding');
    }

    async getWindyData(location) {
        // Windy API requires coordinates and a proper API key
        // This is a demonstration implementation with limitations
        try {
            // For a real implementation, you would need:
            // 1. A proper API key from https://api.windy.com/
            // 2. Geocoding service to convert city name to coordinates
            // 3. Proper error handling for API limits
            
            // Demo implementation (limited functionality)
            const response = await fetch(`https://api.windy.com/api/point-forecast/v2?lat=40.7128&lon=-74.0060&key=demo`);
            
            if (!response.ok) {
                throw new Error('Windy API demo key expired or service unavailable');
            }
            
            const data = await response.json();
            
            // Note: This always returns New York weather regardless of input location
            return {
                temperature: Math.round(data.current?.temperature || 20),
                feelsLike: Math.round(data.current?.temperature || 20), // Windy doesn't provide feels like
                humidity: data.current?.humidity || 50,
                pressure: data.current?.pressure || 1013,
                windSpeed: Math.round(data.current?.windSpeed || 5),
                description: 'Demo weather data from Windy (NYC)',
                location: 'New York, NY (Demo)',
                weatherId: 800, // Default to clear
                service: 'Windy (Demo)'
            };
        } catch (error) {
            throw new Error('Windy API requires proper setup. Please use OpenWeatherMap or AccuWeather instead.');
        }
    }

    async getLocalWeather() {
        this.showLoading();
        
        try {
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            
            let weatherData;
            
            switch (this.currentService) {
                case 'openWeatherMap':
                    weatherData = await this.getOpenWeatherMapDataByCoords(latitude, longitude);
                    break;
                case 'accuWeather':
                    weatherData = await this.getAccuWeatherDataByCoords(latitude, longitude);
                    break;
                default:
                    throw new Error('Local weather not supported for this service');
            }
            
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError('Unable to get your location. Please enter a city name.');
        }
    }

    async getOpenWeatherMapDataByCoords(lat, lon) {
        const apiKey = this.apiKeys.openWeatherMap;
        const response = await fetch(`${this.apiEndpoints.openWeatherMap}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('Failed to get weather data');
        }
        
        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: Math.round(data.wind.speed),
            description: data.weather[0].description,
            location: `${data.name}, ${data.sys.country}`,
            weatherId: data.weather[0].id,
            service: 'OpenWeatherMap'
        };
    }

    async getAccuWeatherDataByCoords(lat, lon) {
        const apiKey = this.apiKeys.accuWeather;
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`);
        
        if (!response.ok) {
            throw new Error('Failed to get location data');
        }
        
        const locationData = await response.json();
        const locationKey = locationData.Key;
        
        const weatherResponse = await fetch(`${this.apiEndpoints.accuWeather}/${locationKey}?apikey=${apiKey}&details=true`);
        const weatherData = await weatherResponse.json();
        const current = weatherData[0];
        
        return {
            temperature: Math.round(current.Temperature.Metric.Value),
            feelsLike: Math.round(current.RealFeelTemperature.Metric.Value),
            humidity: current.RelativeHumidity,
            pressure: Math.round(current.Pressure.Metric.Value),
            windSpeed: Math.round(current.Wind.Speed.Metric.Value),
            description: current.WeatherText,
            location: `${locationData.LocalizedName}, ${locationData.Country.LocalizedName}`,
            weatherId: current.WeatherIcon,
            service: 'AccuWeather'
        };
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: false
            });
        });
    }

    displayWeather(data) {
        const weatherIcon = this.getWeatherIcon(data.weatherId);
        
        this.weatherDisplay.innerHTML = `
            <div class="weather-data">
                <div class="weather-main">
                    <div class="weather-temp">${data.temperature}°C</div>
                    <div class="weather-icon">${weatherIcon}</div>
                </div>
                <div class="weather-description">${data.description}</div>
                <div class="weather-location">${data.location}</div>
                <div class="weather-service">Data from: ${data.service}</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <div class="weather-detail-label">Feels Like</div>
                        <div class="weather-detail-value">${data.feelsLike}°C</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail-label">Humidity</div>
                        <div class="weather-detail-value">${data.humidity}%</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail-label">Wind Speed</div>
                        <div class="weather-detail-value">${data.windSpeed} m/s</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail-label">Pressure</div>
                        <div class="weather-detail-value">${data.pressure} hPa</div>
                    </div>
                </div>
            </div>
        `;
    }

    getWeatherIcon(weatherId) {
        const icons = {
            // Thunderstorm
            200: '⚡', 201: '⚡', 202: '⚡', 210: '⚡', 211: '⚡', 212: '⚡', 221: '⚡', 230: '⚡', 231: '⚡', 232: '⚡',
            // Drizzle
            300: '🌦️', 301: '🌦️', 302: '🌦️', 310: '🌦️', 311: '🌦️', 312: '🌦️', 313: '🌦️', 314: '🌦️', 321: '🌦️',
            // Rain
            500: '🌧️', 501: '🌧️', 502: '🌧️', 503: '🌧️', 504: '🌧️', 511: '🌧️', 520: '🌧️', 521: '🌧️', 522: '🌧️', 531: '🌧️',
            // Snow
            600: '❄️', 601: '❄️', 602: '❄️', 611: '❄️', 612: '❄️', 613: '❄️', 615: '❄️', 616: '❄️', 620: '❄️', 621: '❄️', 622: '❄️',
            // Atmosphere
            701: '🌫️', 711: '🌫️', 721: '🌫️', 731: '🌫️', 741: '🌫️', 751: '🌫️', 761: '🌫️', 762: '🌫️', 771: '🌫️', 781: '🌫️',
            // Clear
            800: '☀️',
            // Clouds
            801: '⛅', 802: '☁️', 803: '☁️', 804: '☁️'
        };
        
        return icons[weatherId] || '🌤️';
    }

    showLoading() {
        this.weatherDisplay.innerHTML = '<div class="loading">Loading weather data...</div>';
    }

    showError(message) {
        this.weatherDisplay.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Initialize the weather widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidget();
}); 