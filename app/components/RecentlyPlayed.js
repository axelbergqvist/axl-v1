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
  if (!tracks || tracks.length === 0) return <p className="text-neutral-500 text-sm">No tracks available</p>;

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={parentVariants}
    >
      <motion.div className="grid grid-cols-2 gap-6" variants={childVariants}>
        {tracks.slice(0, 6).map((track) => (
          <motion.a
            key={track.songUrl}
            href={track.songUrl}
            whileHover={{ x: 2 }}
            transition={{ type: 'easeIn', duration: 0.125 }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <div className="flex-shrink-0 mr-3 rounded-lg relative">
              <div className="w-9 h-9 rounded-md overflow-hidden relative">
                <Image
                  src={track.coverImage.url}
                  alt={track.title}
                  width={100}
                  height={100}
                  className="rounded-md w-full h-full object-cover"
                />
                <div className="absolute inset-0 box-border border border-black/10 dark:border-white/15 rounded-md pointer-events-none"></div>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm truncate">{track.title}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{track.artist}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentlyPlayed;