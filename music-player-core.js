// Music Player Embed
// Create music-player-embed.html with embedded music-player-core.js and music-player-styling.css. Include script loading, player initialization, and usage documentation

class MusicPlayer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      autoplay: options.autoplay || false,
      volume: options.volume || 0.7,
      ...options
    };
    this.currentTrack = null;
    this.isPlaying = false;
    this.init();
  }

  init() {
    this.createPlayerInterface();
    this.setupEventListeners();
  }

  createPlayerInterface() {
    this.container.innerHTML = `
      <div class="music-player">
        <div class="player-header">
          <h3>Music Player</h3>
        </div>
        <div class="player-content">
          <div class="track-info">
            <div class="track-title" id="track-title">No track selected</div>
            <div class="track-artist" id="track-artist">-</div>
          </div>
          <div class="controls">
            <button class="control-btn" id="prev-btn">⏮</button>
            <button class="control-btn play-btn" id="play-btn">▶</button>
            <button class="control-btn" id="next-btn">⏭</button>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="time-display">
              <span id="current-time">0:00</span>
              <span id="total-time">0:00</span>
            </div>
          </div>
          <div class="volume-control">
            <span>🔊</span>
            <input type="range" id="volume-slider" min="0" max="100" value="70">
          </div>
        </div>
        <div class="playlist" id="playlist"></div>
      </div>
    `;
  }

  setupEventListeners() {
    const playBtn = this.container.querySelector('#play-btn');
    const prevBtn = this.container.querySelector('#prev-btn');
    const nextBtn = this.container.querySelector('#next-btn');
    const volumeSlider = this.container.querySelector('#volume-slider');
    
    playBtn.addEventListener('click', () => {
      this.togglePlay();
    });
    
    prevBtn.addEventListener('click', () => {
      this.previousTrack();
    });
    
    nextBtn.addEventListener('click', () => {
      this.nextTrack();
    });
    
    volumeSlider.addEventListener('input', (e) => {
      this.setVolume(e.target.value / 100);
    });
  }

  loadTrack(track) {
    this.currentTrack = track;
    this.updateTrackInfo();
    this.loadAudio();
  }

  updateTrackInfo() {
    const titleEl = this.container.querySelector('#track-title');
    const artistEl = this.container.querySelector('#track-artist');
    
    titleEl.textContent = this.currentTrack.title || 'Unknown Track';
    artistEl.textContent = this.currentTrack.artist || 'Unknown Artist';
  }

  loadAudio() {
    // This would integrate with actual audio APIs
    // For now, we'll simulate the audio loading
    console.log('Loading audio for:', this.currentTrack.title);
  }

  togglePlay() {
    const playBtn = this.container.querySelector('#play-btn');
    
    if (this.isPlaying) {
      this.pause();
      playBtn.textContent = '▶';
    } else {
      this.play();
      playBtn.textContent = '⏸';
    }
  }

  play() {
    this.isPlaying = true;
    console.log('Playing:', this.currentTrack?.title);
  }

  pause() {
    this.isPlaying = false;
    console.log('Paused:', this.currentTrack?.title);
  }

  previousTrack() {
    console.log('Previous track');
    // Implementation would go here
  }

  nextTrack() {
    console.log('Next track');
    // Implementation would go here
  }

  setVolume(volume) {
    this.options.volume = volume;
    console.log('Volume set to:', volume);
  }

  updateProgress(current, total) {
    const progressFill = this.container.querySelector('#progress-fill');
    const currentTimeEl = this.container.querySelector('#current-time');
    const totalTimeEl = this.container.querySelector('#total-time');
    
    const progress = (current / total) * 100;
    progressFill.style.width = `${progress}%`;
    
    currentTimeEl.textContent = this.formatTime(current);
    totalTimeEl.textContent = this.formatTime(total);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MusicPlayer;
}