import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Crown, LogOut, ShieldCheck, Target, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getMyAccount, saveMyProfile } from '@/lib/member.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pageMeta } from '@/lib/public-content';
import { PredictionTable } from '@/components/prediction-table';
import { PredictionExplanation } from '@/components/prediction-explanation';
import { vipActive } from '@/lib/prediction-metrics';

export const Route = createFileRoute('/_authenticated/dashboard')({ head: () => pageMeta('My dashboard', 'Your KAADA PREDICTZ member dashboard and profile.'), component: Dashboard });

function Dashboard() {
  const fetchAccount = useServerFn(getMyAccount);
  const save = useServerFn(saveMyProfile);
  const qc = useQueryClient();
  const navigate = Route.useNavigate();
  const { data, isLoading, error } = useQuery({ queryKey: ['my-account'], queryFn: () => fetchAccount() });
  const [msg, setMsg] = useState('');
  if (isLoading) return <div className="mx-auto max-w-6xl px-4 py-20">Loading your dashboard…</div>;
  if (error || !data) return <div className="mx-auto max-w-6xl px-4 py-20 text-destructive">Could not load your account.</div>;
  const p = data.profile;
  const isAdmin = data.roles.includes('super_admin');
  const activeVip = vipActive(data.subscription?.expires_at);
  const name = p?.full_name || data.email;
  return <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div className="flex items-center gap-4"><div className="grid size-16 place-items-center bg-primary font-display text-2xl font-black text-primary-foreground">{name.slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">Member dashboard</p><h1 className="mt-1 font-display text-3xl font-black">Welcome, {name}</h1><p className="text-sm text-muted-foreground">{data.email}</p></div></div>
      <div className="flex gap-2">{isAdmin && <Button asChild variant="secondary"><Link to="/admin"><ShieldCheck />Admin board</Link></Button>}<Button variant="outline" onClick={async () => { await supabase.auth.signOut(); await navigate({ to: '/' }); }}><LogOut />Log out</Button></div>
    </header>
    <div className="grid gap-px bg-border py-px sm:grid-cols-3 my-8">
      <Stat icon={<Crown />} label="Membership" value={activeVip?'VIP ACTIVE':'FREE'} />
      <Stat icon={<Target />} label="VIP requests" value={String(data.requests.length)} />
      <Stat icon={<User />} label="Account role" value={isAdmin ? data.roles.join(', ').replaceAll('_', ' ') : 'Member'} />
    </div>
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <section className="border border-border bg-card p-6"><h2 className="font-display text-xl font-black">My profile</h2>
        <form className="mt-5 grid gap-4" onSubmit={async e => { e.preventDefault(); const d = new FormData(e.currentTarget); setMsg(''); try { await save({ data: { full_name: String(d.get('full_name')), phone: String(d.get('phone')), country: String(d.get('country')) } }); await qc.invalidateQueries({ queryKey: ['my-account'] }); setMsg('Profile saved.'); } catch (err) { setMsg(err instanceof Error ? err.message : 'Save failed.'); } }}>
          <label className="grid gap-2 text-sm">Full name<Input name="full_name" defaultValue={p?.full_name ?? ''} required minLength={2} /></label>
          <label className="grid gap-2 text-sm">Phone / WhatsApp<Input name="phone" defaultValue={p?.phone ?? ''} /></label>
          <label className="grid gap-2 text-sm">Country<Input name="country" defaultValue={p?.country ?? ''} /></label>
          <label className="grid gap-2 text-sm">Email<Input value={data.email} disabled /></label>
          <Button>Save profile</Button>{msg && <p role="status" className="text-sm text-primary">{msg}</p>}
        </form></section>
      <section className="border border-border bg-card p-6"><div className="flex items-center justify-between"><h2 className="font-display text-xl font-black">My VIP requests</h2><Button asChild size="sm"><Link to="/vip">Request VIP</Link></Button></div>
        {data.requests.length === 0 ? <p className="mt-5 text-sm text-muted-foreground">No requests yet. Choose a VIP package to get started.</p> :
          <ul className="mt-5 divide-y divide-border">{data.requests.map(r => { const pkg = r.vip_packages as { name?: string; price?: number; currency?: string } | null; return <li key={r.id} className="flex items-center justify-between py-3 text-sm"><div><p className="font-bold">{pkg?.name ?? 'VIP package'}</p><p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}{pkg?.price != null ? ` · ${pkg.currency} ${pkg.price}` : ''}</p></div><span className="status">{r.status}</span></li>; })}</ul>}
        <div className="mt-6 grid gap-2 text-sm"><Link to="/predictions" className="text-primary font-bold">Today's predictions →</Link><Link to="/results" className="text-primary font-bold">Past results →</Link><Link to="/contact" className="text-primary font-bold">Contact support →</Link></div>
      </section>
    </div>
    <section className="mt-10 border-t border-border pt-8"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-black">VIP odds</h2><p className="text-sm text-muted-foreground">{data.subscription?.expires_at?`Subscription ${activeVip?'expires':'expired'}: ${new Date(data.subscription.expires_at).toLocaleString()}`:'No active VIP subscription'}</p></div>{activeVip||isAdmin?<PredictionTable items={data.vipPredictions}/>:<Button asChild><Link to="/vip">Request VIP access</Link></Button>}</section>
    <PredictionExplanation/>
  </div>;
}
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-4 bg-background p-5"><span className="text-primary">{icon}</span><div><p className="text-xs text-muted-foreground">{label}</p><p className="font-display text-lg font-black capitalize">{value}</p></div></div>; }
