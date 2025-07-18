// Spotify Integration
// Create Spotify Web Playback SDK integration

class SpotifyAPI {
  constructor(clientId = '', clientSecret = '') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = null;
    this.baseUrl = 'https://api.spotify.com/v1';
  }

  async authenticate() {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
        },
        body: 'grant_type=client_credentials'
      });
      
      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to authenticate with Spotify:', error);
      return null;
    }
  }

  async searchTracks(query, limit = 20) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      const data = await response.json();
      return data.tracks?.items || [];
    } catch (error) {
      console.error('Failed to search tracks:', error);
      return [];
    }
  }

  async getTrack(trackId) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.baseUrl}/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get track:', error);
      return null;
    }
  }

  async getPlaylist(playlistId) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.baseUrl}/playlists/${playlistId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get playlist:', error);
      return null;
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpotifyAPI;
}