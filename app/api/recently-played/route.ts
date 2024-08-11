import { NextResponse } from 'next/server';
import { recentlyPlayedTracks } from '@/lib/spotify';

// Define the structure of the track data
interface SpotifyTrack {
  track: {
    artists: { name: string }[];
    external_urls: { spotify: string };
    album: {
      images: { url: string }[];
    };
    name: string;
  };
}

interface SpotifyData {
  items: SpotifyTrack[];
}

export async function GET() {
  try {
    const data = await recentlyPlayedTracks() as SpotifyData;
    const tracks = data.items.map((item) => ({
      artist: item.track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: item.track.external_urls.spotify,
      coverImage: item.track.album.images[1] || { url: '/default-cover.jpg' },
      title: item.track.name,
    }));
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching recently played tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch recently played tracks' }, { status: 500 });
  }
}

export const revalidate = 60; // revalidate every 60 seconds