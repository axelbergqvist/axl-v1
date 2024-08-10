// app/api/tracks/route.js

import { recentlyPlayedTracks } from '@/lib/spotify';

export async function GET() {
  try {
    console.log('Fetching recently played tracks from Spotify...');
    const data = await recentlyPlayedTracks();
    console.log('Fetched data:', data);

    const tracks = data.items.map((track) => ({
      artist: track.track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.track.external_urls.spotify,
      coverImage: track.track.album.images[1],
      title: track.track.name,
    }));

    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache', // Disable caching for testing
      },
    });
  } catch (error) {
    console.error('Error in /api/tracks:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}