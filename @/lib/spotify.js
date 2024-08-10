// @/lib/spotify.js

import fetch from 'node-fetch';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1/me/player/recently-played';

export async function recentlyPlayedTracks(limit = 6) {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json();
}

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  return response.json();
}