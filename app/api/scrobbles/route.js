// app/api/scrobbles/route.js
import { fetchRecentScrobbles } from '@/lib/lastfm';

export async function GET() {
  const scrobbles = await fetchRecentScrobbles();
  return new Response(JSON.stringify(scrobbles), {
    headers: { 'Content-Type': 'application/json' },
  });
}
