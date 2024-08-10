import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher'; // Adjust the import path based on your project structure
import TrackListItem from './TrackListItem';

const TrackList = () => {
  const { data, error } = useSWR('/api/stats', fetcher, {
    refreshInterval: 30000, // Poll every 30 seconds
  });

  if (error) return <p>Error fetching tracks</p>;
  if (!data) return <p>Loading...</p>;

  console.log(data); // Inspect the data format in the console

  // Ensure data is an array before attempting to map over it
  if (!Array.isArray(data)) {
    return <p>Unexpected data format</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {data.length > 0 ? (
        data.map((track, index) => (
          <TrackListItem key={index} track={track} />
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default TrackList;
