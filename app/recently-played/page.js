// app/recently-played/page.js

import { recentlyPlayedTracks } from '@/lib/spotify';
import RecentlyPlayed from '../components/RecentlyPlayed';

export const revalidate = 60; // revalidate every 60 seconds

async function getRecentlyPlayedTracks() {
  try {
    const data = await recentlyPlayedTracks();
    return data.items.map((track) => ({
      artist: track.track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.track.external_urls.spotify,
      coverImage: track.track.album.images[1] || { url: '/default-cover.jpg' },
      title: track.track.name,
    }));
  } catch (error) {
    console.error('Error fetching recently played tracks:', error);
    return [];
  }
}

export default async function RecentlyPlayedPage() {
  const tracks = await getRecentlyPlayedTracks();

  return (
    <div>
      <h1>My Recently Played Tracks</h1>
      <RecentlyPlayed tracks={tracks} />
    </div>
  );
}