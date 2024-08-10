// app/components/LatestTracks.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function LatestTracks() {
  const { data, error } = useSWR('/api/latest-tracks', fetcher, {
    refreshInterval: 100000, // Refresh data every 100 seconds
  });

  if (error) return <p className="text-red-500">Failed to load tracks</p>;
  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="">
      <ul className="space-y-4">
        {data.map(track => (
          <li key={track.url} className="flex items-center space-x-3">
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 rounded-lg"
            >
              <img
                src={track.image}
                alt={`${track.name} album art`}
                className="w-8 h-8 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-sm truncate">{track.name}</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">{track.artist}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LatestTracks;
