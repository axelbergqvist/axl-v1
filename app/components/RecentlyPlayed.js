// components/RecentlyPlayed.js

import Image from 'next/image';

const RecentlyPlayed = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return <p>No tracks available</p>;

  return (
    <div>
      <h2>Recently Played</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tracks.map((track) => (
          <li key={track.songUrl} style={{ marginBottom: '15px' }}>
            <Image
              src={track.coverImage.url}
              alt={track.title}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
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