import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PageHeader, TrustNotice } from '@/components/site-shell';
import { PredictionTable } from '@/components/prediction-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { publicContentQuery, pageMeta, settled } from '@/lib/public-content';
export const Route = createFileRoute('/results')({ loader: ({context}) => context.queryClient.ensureQueryData(publicContentQuery), head: () => pageMeta('Results & Past Matches', 'Past KAADA PREDICTZ predictions, settled outcomes and match history.'), component: Results });
function Results() {
 const {data} = useSuspenseQuery(publicContentQuery); const [category,setCategory] = useState('all'); const [status,setStatus] = useState('all'); const [date,setDate] = useState('');
 const past = data.predictions.filter(p => settled(p.status) || new Date(p.kickoff).getTime() < Date.now()).sort((a,b) => Date.parse(b.kickoff)-Date.parse(a.kickoff));
 const done = past.filter(p=>settled(p.status)); const wins = done.filter(p=>p.status==='won').length; const decided = done.filter(p=>p.status!=='void').length;
 const shown = past.filter(p => (category==='all'||p.category_id===category)&&(status==='all'||(status==='unsettled'?!settled(p.status):p.status===status))&&(!date||p.kickoff.slice(0,10)===date));
 return <><PageHeader eyebrow="The public record" title="Results & Past Matches" copy="Wins, losses, void selections and past fixtures awaiting a recorded result."/><div className="mx-auto max-w-7xl px-4 py-12 lg:px-8"><div className="mb-8 grid gap-px bg-border sm:grid-cols-3">{[['Settled',done.length],['Won',wins],['Win rate (excludes void)',decided?`${Math.round(wins/decided*100)}%`:'—']].map(([l,v])=><div key={l} className="bg-card p-6"><p className="text-xs text-muted-foreground">{l}</p><p className="mt-2 font-display text-4xl font-black">{v}</p></div>)}</div><div className="mb-5 flex flex-wrap gap-2"><Button size="sm" variant={category==='all'?'default':'outline'} onClick={()=>setCategory('all')}>All categories</Button>{data.categories.map(c=><Button key={c.id} size="sm" variant={category===c.id?'default':'outline'} onClick={()=>setCategory(c.id)}>{c.name}</Button>)}</div><div className="mb-8 flex flex-wrap items-end gap-2">{[['all','All results'],['won','Won'],['lost','Lost'],['void','Void'],['unsettled','Awaiting result']].map(([value,label])=><Button key={value} size="sm" variant={status===value?'secondary':'ghost'} onClick={()=>setStatus(value)}>{label}</Button>)}<label className="ml-auto grid gap-1 text-xs text-muted-foreground">Match date (UTC)<Input type="date" value={date} onChange={e=>setDate(e.target.value)} aria-label="Match date" /></label>{date&&<Button variant="ghost" size="sm" onClick={()=>setDate('')}>Clear date</Button>}</div><PredictionTable items={shown}/><div className="mt-8"><TrustNotice/></div></div></>;
}
