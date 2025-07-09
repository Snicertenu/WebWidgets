class TimezoneWidget {
    constructor() {
        this.timezones = {
            'EST': 'America/New_York',
            'CST': 'America/Chicago', 
            'MST': 'America/Denver',
            'PST': 'America/Los_Angeles'
        };
        this.timeFormat = '24hr'; // Default to 24-hour format
        this.init();
    }

    init() {
        this.addTimeFormatSelector();
        this.updateTime();
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
    }

    addTimeFormatSelector() {
        const timeFormatSelector = document.createElement('div');
        timeFormatSelector.className = 'time-format-selector';
        timeFormatSelector.innerHTML = `
            <label for="time-format">Time Format:</label>
            <select id="time-format">
                <option value="24hr">24-Hour</option>
                <option value="12hr">12-Hour</option>
            </select>
        `;
        
        // Insert at the beginning of the widget content
        const widgetContent = document.querySelector('#timezone-widget .widget-content');
        widgetContent.insertBefore(timeFormatSelector, widgetContent.firstChild);
        
        // Add event listener
        document.getElementById('time-format').addEventListener('change', (e) => {
            this.timeFormat = e.target.value;
            this.updateTime(); // Update immediately when format changes
        });
    }

    updateTime() {
        const now = new Date();
        
        Object.entries(this.timezones).forEach(([abbreviation, timezone]) => {
            const timeElement = document.getElementById(`${abbreviation.toLowerCase()}-time`);
            const dateElement = document.getElementById(`${abbreviation.toLowerCase()}-date`);
            
            if (timeElement && dateElement) {
                const timeInZone = this.getTimeInTimezone(now, timezone);
                const timeString = this.formatTime(timeInZone);
                
                const dateString = timeInZone.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
                
                timeElement.textContent = timeString;
                dateElement.textContent = dateString;
            }
        });
    }

    formatTime(date) {
        if (this.timeFormat === '12hr') {
            return date.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } else {
            return date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }

    getTimeInTimezone(date, timezone) {
        try {
            return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        } catch (error) {
            // Fallback to manual calculation if timezone is not supported
            return this.manualTimezoneConversion(date, timezone);
        }
    }

    manualTimezoneConversion(date, timezone) {
        // Manual timezone offset calculation as fallback
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        
        const offsets = {
            'America/New_York': -5, // EST
            'America/Chicago': -6,  // CST
            'America/Denver': -7,   // MST
            'America/Los_Angeles': -8 // PST
        };
        
        // Check if daylight saving time is in effect
        const isDST = this.isDaylightSavingTime(date, timezone);
        const offset = offsets[timezone] + (isDST ? 1 : 0);
        
        return new Date(utc + (offset * 3600000));
    }

    isDaylightSavingTime(date, timezone) {
        // Simple DST detection for US timezones
        // DST typically starts second Sunday in March and ends first Sunday in November
        
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        const dayOfWeek = date.getDay(); // 0 = Sunday
        
        // Find second Sunday in March
        const marchStart = new Date(year, 2, 1); // March 1st
        const firstSundayInMarch = new Date(year, 2, 1 + (7 - marchStart.getDay()) % 7);
        const secondSundayInMarch = new Date(firstSundayInMarch.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        // Find first Sunday in November
        const novemberStart = new Date(year, 10, 1); // November 1st
        const firstSundayInNovember = new Date(year, 10, 1 + (7 - novemberStart.getDay()) % 7);
        
        // DST is in effect between second Sunday in March and first Sunday in November
        return date >= secondSundayInMarch && date < firstSundayInNovember;
    }
}

// Initialize the timezone widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimezoneWidget();
}); 