import { getApp, getAllApps } from '@/lib/dissect';
import { notFound } from 'next/navigation';
import DissectDetail from './DissectDetail';

export function generateStaticParams() {
  return getAllApps().map((app) => ({ slug: app.slug }));
}

export default function DissectPage({ params }: { params: { slug: string } }) {
  const app = getApp(params.slug);
  if (!app) notFound();

  return <DissectDetail app={app} />;
}