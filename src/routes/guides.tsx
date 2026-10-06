import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/site-shell';
import { publicContentQuery, pageMeta } from '@/lib/public-content';
export const Route = createFileRoute('/guides')({ loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery), head: () => pageMeta('Tips & Guides', 'Football market guides and analysis from KAADA PREDICTZ.'), component: Guides });
function Guides() {
  const { data } = useSuspenseQuery(publicContentQuery);
  const pathname = useRouterState({ select: s => s.location.pathname });
  if (pathname !== '/guides' && pathname !== '/guides/') return <Outlet />;
  return <><PageHeader eyebrow="Knowledge center" title="Tips & Guides" copy="Market insight from the KAADA PREDICTZ editorial team." /><div className="mx-auto max-w-7xl divide-y divide-border px-4 py-10 lg:px-8">{data.articles.map(a => <Link key={a.id} to="/guides/$slug" params={{ slug: a.slug }} className="block py-8"><p className="eyebrow">{a.category} · {a.read_minutes} min read</p><h2 className="mt-3 font-display text-2xl font-bold hover:text-primary">{a.title}</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{a.excerpt}</p></Link>)}</div><Outlet /></>;
}