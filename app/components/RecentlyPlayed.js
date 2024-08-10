// components/RecentlyPlayed.js

"use client";

import useSWR from 'swr';
import { useState } from 'react';

// Define a fetcher function to fetch data from the API
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
    revalidateOnFocus: true, // Refetch data when the window is refocused
    refreshInterval: 60000, // Refresh data every 60 seconds
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
