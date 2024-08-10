// lib/lastfm.js
const API_KEY = 'f104be491c9cc0ea8f0f5f649582ad9b';
const USERNAME = 'axelbergqvist';

export async function fetchRecentScrobbles() {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&api_key=${API_KEY}&format=json`);
  const data = await response.json();
  return data.recenttracks.track.slice(0, 6); // Get the latest 6 scrobbles
}
