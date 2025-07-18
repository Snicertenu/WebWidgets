// Video Widget Core
// Create video-widget-core.js with iframe/embed support, responsive container, and player controls. Include constructor with video URL, aspect ratio handling, and methods for createVideoContainer(), setupResponsiveContainer(), and loadVideo()

class VideoWidget {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      aspectRatio: options.aspectRatio || '16:9',
      autoplay: options.autoplay || false,
      controls: options.controls || true,
      ...options
    };
    this.init();
  }

  init() {
    this.createVideoContainer();
    this.setupResponsiveContainer();
  }

  createVideoContainer() {
    this.videoContainer = document.createElement('div');
    this.videoContainer.className = 'video-widget-container';
    this.container.appendChild(this.videoContainer);
  }

  setupResponsiveContainer() {
    const [width, height] = this.options.aspectRatio.split(':');
    const aspectRatio = (height / width) * 100;
    
    this.videoContainer.style.position = 'relative';
    this.videoContainer.style.width = '100%';
    this.videoContainer.style.paddingBottom = `${aspectRatio}%`;
  }

  loadVideo(videoUrl) {
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    this.videoContainer.appendChild(iframe);
  }

  detectVideoService(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    } else if (url.includes('dailymotion.com')) {
      return 'dailymotion';
    }
    return 'unknown';
  }

  getEmbedUrl(url) {
    const service = this.detectVideoService(url);
    
    switch (service) {
      case 'youtube':
        const videoId = this.extractYouTubeId(url);
        return `https://www.youtube.com/embed/${videoId}?autoplay=${this.options.autoplay ? 1 : 0}&controls=${this.options.controls ? 1 : 0}`;
      case 'vimeo':
        const vimeoId = this.extractVimeoId(url);
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=${this.options.autoplay ? 1 : 0}`;
      default:
        return url;
    }
  }

  extractYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  extractVimeoId(url) {
    const regex = /vimeo\.com\/([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoWidget;
}