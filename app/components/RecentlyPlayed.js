"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data.tracks;
};

const RecentlyPlayed = () => {
  const [retryCount, setRetryCount] = useState(0);

  const { data: tracks, error, isValidating, mutate } = useSWR('/api/tracks', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000,
    dedupingInterval: 0,
    errorRetryCount: 3,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      mutate();
    }, 60000); // Force revalidation every minute

    return () => clearInterval(intervalId);
  }, [mutate]);

  useEffect(() => {
    if (error && retryCount < 3) {
      const timeoutId = setTimeout(() => {
        setRetryCount(prevCount => prevCount + 1);
        mutate();
      }, 5000); // Retry after 5 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [error, retryCount, mutate]);

  if (isValidating) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}. Retrying... (Attempt {retryCount + 1}/3)</p>;
  if (!tracks || tracks.length === 0) return <p>No tracks available</p>;

  return (
    <div>
      <h2>Recently Played</h2>
      <button onClick={() => mutate()}>Refresh Tracks</button>
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