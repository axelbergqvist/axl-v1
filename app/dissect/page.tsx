import { getAllApps } from '@/lib/dissect';
import DissectIndexClient from './DissectIndexClient';

export default function DissectIndexPage() {
  const apps = getAllApps();
  return <DissectIndexClient apps={apps} />;
}