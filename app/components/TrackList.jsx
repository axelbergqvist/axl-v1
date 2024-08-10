import React from 'react';
import useSWR from 'swr';
import TrackListItem from './TrackListItem';
import { fetcher } from '@/lib/fetcher';


const TrackList = () => {
  const { data, error } = useSWR('/api/stats', fetcher, {
    refreshInterval: 30000, // Poll every 30 seconds
  });

  if (error) return <p>Error fetching tracks</p>;
  if (!data) return <p>Loading...</p>;

  console.log(data); // Inspect the data format in the console

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