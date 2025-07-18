// Calendar API Integration
// Create Google Calendar API integration

class CalendarAPI {
  constructor(apiKey = '') {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.googleapis.com/calendar/v3';
  }

  async getEvents(calendarId = 'primary', timeMin, timeMax) {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        timeMin: timeMin || new Date().toISOString(),
        timeMax: timeMax || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const response = await fetch(`${this.baseUrl}/calendars/${calendarId}/events?${params}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to get calendar events:', error);
      return [];
    }
  }

  async createEvent(calendarId = 'primary', event) {
    try {
      const response = await fetch(`${this.baseUrl}/calendars/${calendarId}/events?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to create event:', error);
      return null;
    }
  }

  async updateEvent(calendarId = 'primary', eventId, event) {
    try {
      const response = await fetch(`${this.baseUrl}/calendars/${calendarId}/events/${eventId}?key=${this.apiKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to update event:', error);
      return null;
    }
  }

  async deleteEvent(calendarId = 'primary', eventId) {
    try {
      await fetch(`${this.baseUrl}/calendars/${calendarId}/events/${eventId}?key=${this.apiKey}`, {
        method: 'DELETE'
      });
      return true;
    } catch (error) {
      console.error('Failed to delete event:', error);
      return false;
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalendarAPI;
}