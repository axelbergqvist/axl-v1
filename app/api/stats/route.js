// app/api/stats/route.js

import { recentlyPlayed } from "@/lib/spotify";

export async function GET() {
  try {
    const response = await recentlyPlayed(6); // Set limit to 6
    if (!response.ok) throw new Error('Failed to fetch from Spotify API');
    const { items } = await response.json();

    const tracks = items.map((track) => ({
      title: track.track.name,
      artist: track.track.artists.map((artist) => artist.name).join(", "),
      url: track.track.external_urls.spotify,
      coverImage: track.track.album.images[1]?.url || '',
    }));

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache", // Disable caching for testing
      },
    });
  } catch (error) {
    console.error('Error in /api/stats:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
