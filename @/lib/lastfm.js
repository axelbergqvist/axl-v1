// lib/lastfm.js
const API_KEY = 'f104be491c9cc0ea8f0f5f649582ad9b';  // Replace with your Last.fm API key
const USERNAME = 'axelbergqvist'; // Replace with your Last.fm username

export async function fetchLatestTracks() {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json`);
    const data = await response.json();
    return data.recenttracks.track.slice(0, 6).map(track => ({
      name: track.name,
      artist: track.artist['#text'],
      url: track.url,
      image: track.image.find(img => img.size === 'large')['#text'] // Get the large image
    }));
  }