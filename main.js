// Main JavaScript file for widget testing page
// This file handles any global functionality and widget coordination

document.addEventListener('DOMContentLoaded', () => {
    console.log('Widget Testing Dashboard loaded successfully!');
    
    // Add any global event listeners or functionality here
    document.addEventListener('keydown', (e) => {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    location.reload();
                    break;
                case '1':
                    e.preventDefault();
                    document.getElementById('location-input')?.focus();
                    break;
            }
        }
    });
    
    // Add some helpful information to the console
    console.log('Available keyboard shortcuts:');
    console.log('- Ctrl/Cmd + R: Reload page');
    console.log('- Ctrl/Cmd + 1: Focus weather location input');
    
    // Check if weather API key is set
    const weatherWidget = document.querySelector('#weather-widget');
    if (weatherWidget) {
        const apiKeyElement = weatherWidget.querySelector('.api-key-notice');
        if (!apiKeyElement) {
            const notice = document.createElement('div');
            notice.className = 'api-key-notice';
            notice.style.cssText = `
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 10px;
                margin-top: 10px;
                font-size: 0.9rem;
                color: #856404;
            `;
            notice.innerHTML = `
                <strong>Note:</strong> To use the weather widget, you need to get a free API key from 
                <a href="https://openweathermap.org/api" target="_blank" style="color: #0056b3;">OpenWeatherMap</a> 
                and replace 'YOUR_API_KEY' in weather-widget.js
            `;
            weatherWidget.querySelector('.widget-content').appendChild(notice);
        }
    }
}); 