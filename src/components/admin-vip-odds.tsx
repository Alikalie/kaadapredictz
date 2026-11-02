import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Edit3, Plus } from 'lucide-react';
import { saveVipOdds } from '@/lib/vip-odds.functions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

type Row = Record<string, unknown>;
export function AdminVipOdds({ rows, onSaved }: { rows: Row[]; onSaved: () => Promise<void> }) {
  const save = useServerFn(saveVipOdds);
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const items = rows.filter(r => r.access_level === 'vip');
  return <section>
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-2xl font-black">VIP live odds</h2><p className="text-sm text-muted-foreground">{items.length} VIP fixtures</p></div><Button onClick={() => { setEditing(null); setError(''); setOpen(true); }}><Plus />Add VIP fixture</Button></header>
    <div className="divide-y divide-border border-y border-border">{items.map(r => <div key={String(r.id)} className="flex flex-wrap items-center justify-between gap-4 py-5"><div className="min-w-0"><p className="text-xs text-primary">{String(r.league)}</p><h3 className="break-words font-bold">{String(r.home_team)} vs {String(r.away_team)}</h3><p className="text-sm text-muted-foreground">{String(r.selection)} · {String(r.status)}</p><p className="mt-1 text-xs text-muted-foreground">Updated {new Date(String(r.updated_at)).toLocaleString()}</p></div><div className="flex items-center gap-5"><span className="font-display text-2xl font-black">{Number(r.odds).toFixed(2)}</span><Button variant="outline" size="icon" aria-label={`Edit VIP odds for ${r.home_team} vs ${r.away_team}`} onClick={() => { setEditing(r); setError(''); setOpen(true); }}><Edit3 /></Button></div></div>)}{!items.length && <p className="py-10 text-muted-foreground">No VIP fixtures yet.</p>}</div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto"><DialogHeader><DialogTitle>{editing ? 'Update VIP odds' : 'Add VIP fixture'}</DialogTitle><DialogDescription>VIP match details</DialogDescription></DialogHeader>
      <form key={String(editing?.id ?? 'new')} className="grid gap-4" onSubmit={async e => {
        e.preventDefault(); const form = new FormData(e.currentTarget); setBusy(true); setError('');
        try { await save({ data: {
          id: editing ? String(editing.id) : undefined,
          league: String(form.get('league')), home_team: String(form.get('home_team')), away_team: String(form.get('away_team')),
          kickoff: new Date(String(form.get('kickoff'))).toISOString(), market: String(form.get('market')), selection: String(form.get('selection')),
          odds: Number(form.get('odds')), confidence: Number(form.get('confidence')), analysis: String(form.get('analysis')),
          status: String(form.get('status')) as 'draft' | 'published' | 'pending' | 'won' | 'lost' | 'void',
        } }); await onSaved(); setOpen(false); } catch (err) { setError(err instanceof Error ? err.message : 'Save failed.'); } finally { setBusy(false); }
      }}>
        <div className="grid gap-4 sm:grid-cols-2">{[['league','Competition'],['home_team','Home team'],['away_team','Away team'],['market','Market'],['selection','Selection']].map(([key,label]) => <label key={key} className="grid gap-2 text-sm">{label}<Input name={key} required defaultValue={String(editing?.[key] ?? '')} /></label>)}
          <label className="grid gap-2 text-sm">Kickoff (local time)<Input name="kickoff" type="datetime-local" required defaultValue={editing?.kickoff ? new Date(String(editing.kickoff)).toLocaleString('sv-SE').replace(' ','T').slice(0,16) : ''} /></label>
          <label className="grid gap-2 text-sm">Decimal odds<Input name="odds" type="number" min="1.01" max="10000" step="0.01" required defaultValue={String(editing?.odds ?? '')} /></label>
          <label className="grid gap-2 text-sm">Confidence (%)<Input name="confidence" type="number" min="0" max="100" required defaultValue={String(editing?.confidence ?? 70)} /></label>
        </div>
        <label className="grid gap-2 text-sm">Match analysis<Textarea name="analysis" rows={5} required maxLength={12000} defaultValue={String(editing?.analysis ?? '')} /></label>
        <label className="grid gap-2 text-sm">Status<select name="status" className="h-10 border border-input bg-background px-3" defaultValue={String(editing?.status ?? 'draft')}>{['draft','published','pending','won','lost','void'].map(s => <option key={s} value={s}>{s}</option>)}</select></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy}>{busy ? 'Saving…' : 'Save VIP odds'}</Button>
      </form>
    </DialogContent></Dialog>
  </section>;
}