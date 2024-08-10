import React, { useEffect, useState } from 'react';
import TrackListItem from './TrackListItem';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/api/stats'); // Adjust the path based on your actual API endpoint
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div>
      {tracks.length > 0 ? (
        tracks.map((track, index) => (
          <TrackListItem key={index} track={track} />
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default TrackList;
