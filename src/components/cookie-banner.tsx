import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicContentQuery, getSetting, str } from '@/lib/public-content';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const {data}=useQuery(publicContentQuery);
  const text=str(getSetting(data?.settings,'cookies').text,'We use essential cookies to keep you signed in and improve your experience.');
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(!localStorage.getItem('kp-cookie-consent')); }, []);
  if (!show) return null;
  const choose = (v: string) => { localStorage.setItem('kp-cookie-consent', v); setShow(false); };
  return <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-col gap-3 border border-primary/40 bg-card p-4 shadow-2xl sm:flex-row sm:items-center">
    <p className="flex-1 text-sm text-muted-foreground">{text} <Link to="/legal/$slug" params={{ slug: 'cookies' }} className="font-bold text-primary">Cookie Policy</Link>.</p>
    <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => choose('essential')}>Essential only</Button><Button size="sm" onClick={() => choose('all')}>Accept</Button></div>
  </div>;
}
