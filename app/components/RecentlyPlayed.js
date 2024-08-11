// components/RecentlyPlayed.js

'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 70,
    },
  },
};

const RecentlyPlayed = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return <p className="text-gray-500 italic">No tracks available</p>;

  return (
    <motion.div
      className=""
      initial="hidden"
      animate="visible"
      variants={parentVariants}
    >
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={childVariants}>
        {tracks.slice(0, 6).map((track) => (
          <motion.a
            key={track.songUrl}
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-200 transition duration-300 flex flex-row items-center cursor-pointer"
          >
            <div className="flex-shrink-0 mr-3">
              <Image
                src={track.coverImage.url}
                alt={track.title}
                width={32}
                height={32}
                className="rounded-md w-full h-8 object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-800 truncate">{track.title}</p>
              <p className="text-sm text-gray-600 truncate">{track.artist}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentlyPlayed;