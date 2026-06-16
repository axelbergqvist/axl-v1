import fs from 'fs';
import path from 'path';

const DISSECT_DIR = path.join(process.cwd(), 'public', 'dissect');

export interface AppMeta {
  name: string;
  description: string;
  figmaUrl: string;
  uploaded: string;
  baseFont: number;
  baseRadius: number;
  resolution: string;
  tags: string[];
  colors: string[];
}

export interface AppEntry {
  slug: string;
  meta: AppMeta;
  screens: { label: string; src: string }[];
}

function labelFromFilename(filename: string): string {
  const base = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  const withoutIndex = base.replace(/^\d+[-_]?/, '');
  return withoutIndex
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' / ');
}

export function getAllApps(): AppEntry[] {
  if (!fs.existsSync(DISSECT_DIR)) return [];

  const slugs = fs.readdirSync(DISSECT_DIR).filter((f) =>
    fs.statSync(path.join(DISSECT_DIR, f)).isDirectory()
  );

  return slugs
    .map((slug) => getApp(slug))
    .filter((a): a is AppEntry => a !== null);
}

export function getApp(slug: string): AppEntry | null {
  const dir = path.join(DISSECT_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const metaPath = path.join(dir, 'meta.json');
  if (!fs.existsSync(metaPath)) return null;

  const meta: AppMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

  const screens = fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f) && f.toLowerCase() !== 'icon.png')
    .sort()
    .map((f) => ({
      label: labelFromFilename(f),
      src: `/dissect/${slug}/${f}`,
    }));

  return { slug, meta, screens };
}