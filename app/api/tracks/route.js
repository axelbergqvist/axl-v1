import { recentlyPlayedTracks } from '@/lib/spotify';

export async function GET() {
    const response = await recentlyPlayedTracks();
    const { items } = await response.json();

    const tracks = items.map((track) => ({
        artist: track.track.artists.map((_artist) => _artist.name).join(', '),
        songUrl: track.track.external_urls.spotify,
        coverImage: track.track.album.images[1],
        title: track.track.name
    }));

    return new Response(JSON.stringify({ tracks }), {
        status: 200,
        headers: {
            'content-type': 'application/json',
            'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
        }
    });
}
