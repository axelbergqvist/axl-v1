// app/components/RecentlyPlayed.js
'use client'; // This directive makes this component a client component

import { useQuery } from '@tanstack/react-query';
import { fetchTracks } from '@/lib/fetcher'; // Adjust the import path as needed

const RecentlyPlayed = () => {
  const { data: tracks, error, isFetching } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!tracks) return <p>No tracks available</p>;

  return (
    <div>
      <h2>Recently Played</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tracks.map((track) => (
          <li key={track.songUrl} style={{ marginBottom: '15px' }}>
            <img
              src={track.coverImage.url}
              alt={track.title}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayed;
