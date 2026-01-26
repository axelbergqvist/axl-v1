'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const stockholmTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Stockholm',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(stockholmTime);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="px-4 pb-4 pt-16 flex items-center mx-auto w-full">
        <p className="w-full text-sm text-neutral-500 dark:text-neutral-400">
          ©2026 Axel Bergqvist
        </p>
        <div className="flex w-full gap-2">
        <p className="text-right w-full text-sm text-neutral-900 dark:text-neutral-400 tabular-nums">
          {time || '00:00:00 AM'}
        </p>
        <p className="text-left w-full text-sm text-neutral-500 dark:text-neutral-400">
          Stockholm, Sweden
        </p>
        </div>
        <a
            className="w-full text-right transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:axelbergqvist@live.se"
          >
            <p className="text-sm">axelbergqvist@live.se</p>
        </a>
    </footer>
  )
}