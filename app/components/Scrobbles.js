// components/Scrobbles.js
'use client';

import { useEffect, useState } from 'react';

const Scrobbles = () => {
  const [scrobbles, setScrobbles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScrobbles() {
      try {
        const response = await fetch('/api/scrobbles');
        if (!response.ok) throw new Error('Failed to fetch scrobbles');
        const data = await response.json();
        setScrobbles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchScrobbles();
  }, []);

  if (loading) return <p>Loading scrobbles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Latest Scrobbles</h2>
      <ul>
        {scrobbles.map((track, index) => {
          const artist = encodeURIComponent(track.artist['#text']);
          const trackName = encodeURIComponent(track.name);
          const lastFmUrl = `https://www.last.fm/music/${artist}/${trackName}`;

          return (
            <li key={index} className="mb-2">
              <a href={lastFmUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                <strong>{track.name}</strong> by {track.artist['#text']}
              </a>
              <br />
              <img src={track.image[2]['#text']} alt={track.name} className="mt-1" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Scrobbles;
