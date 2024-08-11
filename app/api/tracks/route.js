// app/api/tracks/route.js

import { recentlyPlayedTracks } from '@/lib/spotify';

export async function GET() {
  try {
    console.log('Fetching recently played tracks from Spotify...');
    const data = await recentlyPlayedTracks();
    console.log('Fetched data:', JSON.stringify(data));

    if (!data.items || data.items.length === 0) {
      console.warn('No tracks returned from Spotify API');
      return new Response(JSON.stringify({ tracks: [] }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store, max-age=0',
        },
      });
    }

    const tracks = data.items.map((track) => ({
      artist: track.track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.track.external_urls.spotify,
      coverImage: track.track.album.images[1] || { url: '/default-cover.jpg' },
      title: track.track.name,
    }));

    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error in /api/tracks:', error);
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store, max-age=0' },
    });
  }
}