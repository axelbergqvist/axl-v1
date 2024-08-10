// components/Carousel.js
import React from 'react';
import { useEffect, useRef } from 'react';

const Carousel = ({ items }) => {
  const containerRef = useRef(null);
  const scrollSpeed = 30; // Adjust speed as needed

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.scrollWidth / 2; // Width of half the container for seamless scrolling

    const animateScroll = () => {
      container.scrollLeft += 1;
      if (container.scrollLeft >= containerWidth) {
        container.scrollLeft = 0;
      }
    };

    const interval = setInterval(animateScroll, scrollSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full"
            style={{ minWidth: '100%' }}
          >
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
