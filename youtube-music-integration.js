// YouTube Music Integration
// Create YouTube Music API integration

class YouTubeMusicAPI {
  constructor(apiKey = '') {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async searchMusic(query, maxResults = 20) {
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: maxResults,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to search music:', error);
      return [];
    }
  }

  async getVideoDetails(videoId) {
    try {
      const params = new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      const data = await response.json();
      return data.items?.[0] || null;
    } catch (error) {
      console.error('Failed to get video details:', error);
      return null;
    }
  }

  async getPlaylist(playlistId, maxResults = 50) {
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: maxResults,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/playlistItems?${params}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to get playlist:', error);
      return [];
    }
  }

  getEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YouTubeMusicAPI;
}