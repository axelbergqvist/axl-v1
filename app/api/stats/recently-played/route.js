// app/api/stats/recently-played/route.js
import { getRecentlyPlayed } from "@/lib/spotify"; // Adjust the import path based on your project structure

export async function GET() {
  try {
    const response = await getRecentlyPlayed();
    const { items } = await response.json();

    // Format the data as needed
    const tracks = items.slice(0, 6).map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(", "),
      url: item.track.external_urls.spotify,
      coverImage: item.track.album.images[1]?.url || '', // Ensure there's a fallback if the image is undefined
    }));

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch recently played tracks' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
