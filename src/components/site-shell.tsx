import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShieldCheck, Mail } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane, FaFacebookF } from "react-icons/fa";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CookieBanner } from "@/components/cookie-banner";
import { getSetting, publicContentQuery, str } from "@/lib/public-content";

function useSettings() { const { data } = useQuery(publicContentQuery); return data?.settings; }

const nav = [
  ["Predictions", "/predictions"], ["Results", "/results"], ["VIP", "/vip"],
  ["Tips & Guides", "/guides"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function Wordmark() {
  const name = str(getSetting(useSettings(), 'brand').name, 'KAADA PREDICTZ');
  const [first, ...rest] = name.split(' ');
  return <Link to="/" className="font-display text-xl font-black tracking-normal text-foreground">{first} <span className="text-primary">{rest.join(' ')}</span></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-8"><Wordmark />
        <nav className="hidden items-center gap-7 lg:flex">{nav.map(([label,to]) => <Link key={to} to={to} className={`text-sm font-semibold transition-colors hover:text-primary ${pathname.startsWith(to) ? 'text-primary' : 'text-muted-foreground'}`}>{label}</Link>)}</nav>
        <div className="hidden items-center gap-2 lg:flex"><Button asChild size="sm"><Link to="/vip">Join VIP</Link></Button></div>
        <Button aria-label="Toggle menu" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border px-4 py-4 lg:hidden">{nav.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm font-bold">{label}</Link>)}</nav>}
    </header>
    <main>{children}</main>
    <SiteFooter />
    <CookieBanner />
  </div>;
}
function SiteFooter() {
  const settings = useSettings();
  const f = getSetting(settings, 'footer'); const c = getSetting(settings, 'contact'); const legal = getSetting(settings, 'legal');
  const links: { label: string; url: string }[] = Array.isArray(f.links) ? f.links.filter((l: any) => l && typeof l.label === 'string' && typeof l.url === 'string') : [];
  const isInternal = (u: string) => u.startsWith('/');
  const wa = str(c.whatsapp).replace(/[^0-9]/g, '');
  return <footer className="border-t border-border bg-card">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
      <div><Wordmark/><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{str(f.about, 'Football analysis built on form, context and transparent results.')}</p></div>
      <div><h3 className="text-xs font-black uppercase tracking-widest">Explore</h3><div className="mt-4 grid gap-3">{links.map(l => isInternal(l.url) ? <a key={l.url+l.label} href={l.url} className="text-sm text-muted-foreground hover:text-primary">{l.label}</a> : <a key={l.url+l.label} href={l.url} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">{l.label}</a>)}<Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary">My account</Link></div></div>
      <div><h3 className="text-xs font-black uppercase tracking-widest">Contact</h3>{str(c.email) && <a href={`mailto:${c.email}`} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><Mail className="size-4 shrink-0"/>{c.email}</a>}<div className="mt-4 flex gap-2">{wa && <Button asChild variant="outline" size="icon"><a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp/></a></Button>}{str(c.telegram) && <Button asChild variant="outline" size="icon"><a href={c.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegramPlane/></a></Button>}{str(c.facebook) && <Button asChild variant="outline" size="icon"><a href={c.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF/></a></Button>}</div></div>
    </div>
    <div className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8"><span>{str(f.copyright, '© 2026 KAADA PREDICTZ. All rights reserved.')}</span><div className="flex flex-wrap gap-4">{Object.entries(legal).map(([slug, v]) => <Link key={slug} to="/legal/$slug" params={{ slug }} className="hover:text-primary">{str((v as any)?.title, slug)}</Link>)}</div></div></div>
  </footer>;
}

export function PageHeader({ eyebrow, title, copy }: {eyebrow:string;title:string;copy:string}) { return <section className="border-b border-border bg-card"><div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{copy}</p></div></section> }
export function StatusBadge({status}:{status:string}) { return <span className={`status status-${status}`}>{status}</span> }
export function TrustNotice() { return <div className="flex gap-3 border border-border bg-card p-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary"/><p><strong className="text-foreground">Stay in control.</strong> Predictions are opinions based on available information. Past performance does not guarantee future results. 18+ only.</p></div> }
