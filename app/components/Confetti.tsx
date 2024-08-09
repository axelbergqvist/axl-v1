import React, { useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fireConfetti = useCallback(() => {
    if (!canvasRef.current) return;

    confetti.create(canvasRef.current, { resize: true })({
      particleCount: 100,
      spread: 70,
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10, }}
    />
  );
};

export default Confetti;
