import { createFileRoute, notFound } from '@tanstack/react-router';
import { getSetting, pageMeta, publicContentQuery, str } from '@/lib/public-content';
import { PageHeader } from '@/components/site-shell';

export const Route = createFileRoute('/legal/$slug')({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(publicContentQuery);
    const p = getSetting(data.settings, 'legal')[params.slug];
    if (!p || typeof p !== 'object') throw notFound();
    return { title: str(p.title, 'Policy'), text: str(p.text) };
  },
  head: ({ loaderData }) => pageMeta(loaderData?.title ?? 'Legal', loaderData?.text.slice(0, 150) || 'KAADA PREDICTZ policies.'),
  component: Legal,
});
function Legal() {
  const p = Route.useLoaderData();
  return <><PageHeader eyebrow="Policies" title={p.title} copy="Last updated by the KAADA PREDICTZ team." /><div className="mx-auto max-w-4xl whitespace-pre-line px-4 py-12 leading-8 text-muted-foreground">{p.text}</div></>;
}
