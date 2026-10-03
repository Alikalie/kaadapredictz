import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShieldCheck, Instagram, Send, LockKeyhole } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Predictions", "/predictions"], ["Results", "/results"], ["VIP", "/vip"],
  ["Tips & Guides", "/guides"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function Wordmark() {
  return <Link to="/" className="font-display text-xl font-black tracking-normal text-foreground">KAADA <span className="text-primary">PREDICTZ</span></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background text-foreground">
    <div className="border-b border-primary/20 bg-primary py-2 text-center text-[11px] font-bold uppercase tracking-widest text-primary-foreground">18+ • Play responsibly • Predictions are informational, never guaranteed</div>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-8"><Wordmark />
        <nav className="hidden items-center gap-7 lg:flex">{nav.map(([label,to]) => <Link key={to} to={to} className={`text-sm font-semibold transition-colors hover:text-primary ${pathname.startsWith(to) ? 'text-primary' : 'text-muted-foreground'}`}>{label}</Link>)}</nav>
        <div className="hidden items-center gap-2 lg:flex"><Button asChild variant="ghost" size="sm"><Link to="/auth"><LockKeyhole /> Sign in</Link></Button><Button asChild size="sm"><Link to="/vip">Join VIP</Link></Button></div>
        <Button aria-label="Toggle menu" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border px-4 py-4 lg:hidden">{nav.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm font-bold">{label}</Link>)}<Link to="/auth" className="mt-3 block py-2 text-sm font-bold text-primary">Admin sign in</Link></nav>}
    </header>
    <main>{children}</main>
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8"><div><Wordmark/><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Football analysis built on form, context and transparent results. Make your own decisions and play responsibly.</p></div><FooterGroup title="Explore" links={[["Predictions","/predictions"],["Results","/results"],["VIP","/vip"]]} /><FooterGroup title="Learn" links={[["Guides","/guides"],["About","/about"],["Contact","/contact"]]} /><div><h3 className="text-xs font-black uppercase tracking-widest">Follow the game</h3><div className="mt-4 flex gap-2"><Button variant="outline" size="icon" aria-label="Instagram"><Instagram/></Button><Button variant="outline" size="icon" aria-label="Telegram"><Send/></Button></div></div></div>
      <div className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8"><span>© 2026 KAADA PREDICTZ. All rights reserved.</span><div className="flex flex-wrap gap-4"><Link to="/legal/$slug" params={{slug:'responsible-betting'}}>Responsible Betting</Link><Link to="/legal/$slug" params={{slug:'privacy'}}>Privacy</Link><Link to="/legal/$slug" params={{slug:'terms'}}>Terms</Link></div></div></div>
    </footer>
  </div>;
}
function FooterGroup({title,links}:{title:string;links:readonly (readonly [string,string])[]}) { return <div><h3 className="text-xs font-black uppercase tracking-widest">{title}</h3><div className="mt-4 grid gap-3">{links.map(([l,t])=><Link key={t} to={t} className="text-sm text-muted-foreground hover:text-primary">{l}</Link>)}</div></div> }

export function PageHeader({ eyebrow, title, copy }: {eyebrow:string;title:string;copy:string}) { return <section className="border-b border-border bg-card"><div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{copy}</p></div></section> }
export function StatusBadge({status}:{status:string}) { return <span className={`status status-${status}`}>{status}</span> }
export function TrustNotice() { return <div className="flex gap-3 border border-border bg-card p-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary"/><p><strong className="text-foreground">Stay in control.</strong> Predictions are opinions based on available information. Past performance does not guarantee future results. 18+ only.</p></div> }
