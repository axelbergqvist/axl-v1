import React, { useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'opacity 1s',
      }}
    />
  );
};

export default Confetti;