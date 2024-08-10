// app/api/latest-tracks/route.js
import { fetchLatestTracks } from '@/lib/lastfm';

let cache = null;
let lastFetch = Date.now();
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export async function GET() {
  const now = Date.now();
  if (cache && (now - lastFetch) < CACHE_DURATION) {
    // Return cached data if it's still valid
    return new Response(JSON.stringify(cache), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // Fetch new data
  try {
    cache = await fetchLatestTracks();
    lastFetch = now;
    return new Response(JSON.stringify(cache), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch tracks', { status: 500 });
  }
}
