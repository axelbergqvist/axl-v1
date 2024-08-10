import React from 'react';

const TrackListItem = ({ track }) => {
  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="track-list-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        transition: 'background-color 0.3s',
      }}
    >
      <img
        src={track.coverImage}
        alt={`${track.title} cover`}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      />
      <div>
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '5px',
          }}
        >
          {track.title}
        </div>
        <div
          style={{
            color: '#555',
          }}
        >
          {track.artist}
        </div>
      </div>
    </a>
  );
};

export default TrackListItem;
