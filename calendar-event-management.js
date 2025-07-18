// Calendar Widget Core
// Create the core calendar widget functionality

class CalendarWidget {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      events: options.events || [],
      holidays: options.holidays || [],
      ...options
    };
    this.currentDate = new Date();
    this.init();
  }

  init() {
    this.createCalendarInterface();
    this.renderCalendar();
    this.setupEventListeners();
  }

  createCalendarInterface() {
    this.container.innerHTML = `
      <div class="calendar-widget">
        <div class="calendar-header">
          <button class="nav-btn" id="prev-month">&lt;</button>
          <h3 id="month-year"></h3>
          <button class="nav-btn" id="next-month">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div class="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="days" id="calendar-days"></div>
        </div>
        <div class="events-list" id="events-list"></div>
      </div>
    `;
  }

  renderCalendar() {
    const monthYear = this.container.querySelector('#month-year');
    const daysContainer = this.container.querySelector('#calendar-days');
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    monthYear.textContent = `${this.getMonthName(month)} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    let html = '';
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = this.isToday(currentDate);
      const hasEvents = this.hasEvents(currentDate);
      
      html += `
        <div class="day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
             data-date="${currentDate.toISOString().split('T')[0]}">
          ${currentDate.getDate()}
        </div>
      `;
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    daysContainer.innerHTML = html;
  }

  setupEventListeners() {
    const prevBtn = this.container.querySelector('#prev-month');
    const nextBtn = this.container.querySelector('#next-month');
    const daysContainer = this.container.querySelector('#calendar-days');
    
    prevBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });
    
    daysContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('day')) {
        const date = e.target.dataset.date;
        this.showEventsForDate(date);
      }
    });
  }

  getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  }

  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  hasEvents(date) {
    const dateStr = date.toISOString().split('T')[0];
    return this.options.events.some(event => event.date === dateStr);
  }

  showEventsForDate(date) {
    const events = this.options.events.filter(event => event.date === date);
    const eventsList = this.container.querySelector('#events-list');
    
    if (events.length > 0) {
      eventsList.innerHTML = `
        <h4>Events for ${new Date(date).toLocaleDateString()}</h4>
        ${events.map(event => `
          <div class="event-item">
            <strong>${event.title}</strong>
            <span>${event.time || ''}</span>
          </div>
        `).join('')}
      `;
    } else {
      eventsList.innerHTML = '<p>No events for this date</p>';
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalendarWidget;
}