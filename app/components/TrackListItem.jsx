// app/components/TrackListItem.jsx

import React from 'react';
import { motion } from 'framer-motion';

const TrackListItem = ({ track }) => {
return (
    <motion.a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-inherit no-underline rounded-lg"
        whileHover={{ x: 4 }} // Hover animation
        transition={{ type: 'spring', stiffness: 400, damping: 30 }} // Optional: Add smoothness to the animation
    >
        <img
            src={track.coverImage}
            alt={`${track.title} cover`}
            className="w-8 h-8 object-cover rounded-md mr-3"
        />
        <div>
            <div className="text-sm w-full truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
                {track.title}
            </div>
            <div className="text-sm truncate text-neutral-500 dark:text-neutral-400">
                {track.artist}
            </div>
        </div>
    </motion.a>
);
};

export default TrackListItem;