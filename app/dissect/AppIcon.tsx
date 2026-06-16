'use client';

import Image from 'next/image';

export default function AppIcon({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center overflow-hidden shrink-0">
      <Image
        src={`/dissect/${slug}/icon.png`}
        alt={name}
        width={40}
        height={40}
        className="w-full h-full object-cover"
        unoptimized
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}