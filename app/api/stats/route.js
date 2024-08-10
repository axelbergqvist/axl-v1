import { recentlyPlayed } from "@/lib/spotify"; // Adjust the import path based on your project structure

// app/api/stats/route.js

export async function GET() {
  try {
    const response = await recentlyPlayed(6); // Set limit to 6
    const { items } = await response.json();

    // Format the data as needed
    const tracks = items.map((track) => ({
      title: track.track.name,
      artist: track.track.artists.map((artist) => artist.name).join(", "),
      url: track.track.external_urls.spotify,
      coverImage: track.track.album.images[1]?.url || '', // Ensure there's a fallback if the image is undefined
    }));

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
