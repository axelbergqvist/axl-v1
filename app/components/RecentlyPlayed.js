// components/RecentlyPlayed.js

"use client";

import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data.tracks;
};

const RecentlyPlayed = () => {
  const { data: tracks, error, isValidating } = useSWR('/api/tracks', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000, // Adjust as needed
    dedupingInterval: 0, // Add this line to disable deduping
  });

  if (isValidating) return <p>Loading...</p>;
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
