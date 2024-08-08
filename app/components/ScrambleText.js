// components/ScrambleText.js

import { useEffect, useRef, useState } from 'react';

const ScrambleText = ({ text, className }) => {
  const [scrambled, setScrambled] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    const scramble = () => {
      const letters = 'abcdefghijklmnopqrstuvwxyz!"#€%&/()?^*.:_,;=';
      const scrambleText = text.split('').map((char) => {
        if (char === ' ') return ' ';
        return letters[Math.floor(Math.random() * letters.length)];
      }).join('');
      setScrambled(scrambleText);
    };

    const startScramble = () => {
      scramble();
      intervalRef.current = setInterval(scramble, 50);
    };

    startScramble();

    // Reset and stop scrambling after 1 second
    const stopScramble = setTimeout(() => {
      clearInterval(intervalRef.current);
      setScrambled(text);
    }, 1000);

    // Repeat scramble effect every 3 seconds
    const repeatScramble = setInterval(() => {
      startScramble();
      clearTimeout(stopScramble);
      setTimeout(() => {
        clearInterval(intervalRef.current);
        setScrambled(text);
      }, 1000);
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(repeatScramble);
      clearTimeout(stopScramble);
    };
  }, [text]);

  return (
    <h1 className={className}>
      {scrambled}
    </h1>
  );
};

export default ScrambleText;
