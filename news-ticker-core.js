// News Ticker Webflow
// Create news-ticker-webflow.html optimized for Webflow with Webflow-specific classes, custom attributes, and integration instructions

class NewsTicker {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      speed: options.speed || 50,
      direction: options.direction || 'left',
      pauseOnHover: options.pauseOnHover || true,
      ...options
    };
    this.init();
  }

  init() {
    this.createTickerElement();
    this.loadNews();
    this.startScrolling();
  }

  createTickerElement() {
    this.ticker = document.createElement('div');
    this.ticker.className = 'news-ticker';
    this.ticker.innerHTML = '<div class="ticker-content"></div>';
    this.container.appendChild(this.ticker);
  }

  async loadNews() {
    try {
      const response = await fetch('/api/news');
      const news = await response.json();
      this.displayNews(news);
    } catch (error) {
      console.error('Failed to load news:', error);
      // Fallback to sample news
      this.displayNews([
        { title: 'Breaking: Widget system launched successfully!' },
        { title: 'New features added to website widgets' },
        { title: 'Developer tools updated for better performance' }
      ]);
    }
  }

  displayNews(news) {
    const content = this.ticker.querySelector('.ticker-content');
    content.innerHTML = news.map(item => 
      `<span class="ticker-item">${item.title}</span>`
    ).join('');
  }

  startScrolling() {
    const content = this.ticker.querySelector('.ticker-content');
    let position = 0;
    
    setInterval(() => {
      position -= this.options.speed / 100;
      content.style.transform = `translateX(${position}px)`;
      
      if (position < -content.offsetWidth) {
        position = this.container.offsetWidth;
      }
    }, 50);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsTicker;
}