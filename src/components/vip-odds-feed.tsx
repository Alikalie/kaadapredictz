import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Link } from '@tanstack/react-router';
import { Activity, Clock3, RefreshCw } from 'lucide-react';
import { getVipOddsFeed } from '@/lib/vip-odds.functions';
import { canReadVipOdds, VIP_ODDS_REFRESH_MS } from '@/lib/vip-odds';
import { Button } from './ui/button';

export function VipOddsFeed({ roles }: { roles: string[] }) {
  const fetchFeed = useServerFn(getVipOddsFeed);
  const { data, error, isFetching, refetch } = useQuery({ queryKey: ['vip-odds-feed'], queryFn: () => fetchFeed(), refetchInterval: VIP_ODDS_REFRESH_MS, refetchOnWindowFocus: true });
  const allowed = data?.allowed && canReadVipOdds(roles, data.expiresAt);
  return <section className="mt-10 border-t border-border pt-8" aria-label="VIP live odds">
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h2 className="flex items-center gap-2 font-display text-2xl font-black"><Activity className="text-primary" />VIP live odds</h2><p className="mt-2 text-xs text-muted-foreground">Admin-updated · {data ? `Last checked ${new Date(data.checkedAt).toLocaleTimeString()}` : 'Connecting…'}</p>{data?.expiresAt && <p className="mt-1 text-xs text-muted-foreground">Subscription expires: {new Date(data.expiresAt).toLocaleString()}</p>}</div><Button size="icon" variant="outline" aria-label="Refresh VIP odds" title="Refresh VIP odds" disabled={isFetching} onClick={() => void refetch()}><RefreshCw className={isFetching ? 'animate-spin' : ''} /></Button></header>
    {error ? <p role="alert" className="text-destructive">Latest odds unavailable. Refresh to try again.</p> : !data ? <p className="text-muted-foreground">Loading VIP odds…</p> : !allowed ? <Button asChild><Link to="/vip">Request VIP access</Link></Button> : !data.items.length ? <p className="border-y border-border py-8 text-muted-foreground">No open VIP fixtures right now.</p> : <div className="grid gap-4 md:grid-cols-2">{data.items.map(p => <article key={p.id} className="min-w-0 rounded-md border border-border bg-card p-5">
      <div className="flex flex-wrap justify-between gap-2 text-xs"><span className="font-bold text-primary">{p.league}</span><span className="text-warning">{p.status}</span></div>
      <h3 className="mt-3 break-words font-display text-lg font-bold">{p.home_team} vs {p.away_team}</h3><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3 shrink-0" />{new Date(p.kickoff).toLocaleString('en-GB', { timeZone: 'UTC' })} UTC</p>
      <div className="my-5 flex items-center justify-between gap-4 border-y border-border py-4"><div className="min-w-0"><p className="break-words font-bold">{p.selection}</p><p className="text-xs text-muted-foreground">{p.market}</p></div><span className="shrink-0 font-display text-3xl font-black text-primary">{Number(p.odds).toFixed(2)}</span></div>
      <h4 className="text-sm font-bold">Match analysis</h4><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">{p.analysis || 'Analysis pending.'}</p><p className="mt-4 text-xs text-muted-foreground">Confidence {p.confidence}% · Updated {new Date(p.updated_at).toLocaleString()}</p>
    </article>)}</div>}
  </section>;
}