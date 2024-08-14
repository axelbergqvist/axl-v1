'use client';  // Add this line to mark the file as a Client Component

import { useRef, useState } from 'react';

interface CustomVideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, autoPlay = true, loop = true, muted = true }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [isSpeedHalf, setIsSpeedHalf] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const togglePlaybackRate = () => {
    if (videoRef.current) {
      const newRate = isSpeedHalf ? 1 : 0.5;
      videoRef.current.playbackRate = newRate;
      setIsSpeedHalf(!isSpeedHalf);
    }
  };

  return (
    <div className="relative">
      <video
        className="mb-6 rounded-lg w-full border border-[#efefef] dark:border-neutral-80"
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        ref={videoRef}
      />
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center px-2 py-0 h-6 bg-neutral-200 text-black rounded-full hover:bg-neutral-300 text-xs button-transition"
          style={{ width: isPaused ? '48px' : '56px' }} // Adjust width as needed
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          onClick={togglePlaybackRate}
          className={`flex items-center justify-center px-4 py-2 ${isSpeedHalf ? 'bg-neutral-200' : 'bg-neutral-200'} text-black text-xs h-6 rounded-full hover:bg-neutral-300 button-transition`}
          style={{ width: isSpeedHalf ? '44px' : '32px' }} // Adjust width as needed
        >
          {isSpeedHalf ? '0.5x' : '1x'}
        </button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
