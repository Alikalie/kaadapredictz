import { queryOptions } from '@tanstack/react-query';
import { getPublicContent } from './content.functions';
export const publicContentQuery = queryOptions({ queryKey: ['public-content'], queryFn: () => getPublicContent(), staleTime: 30_000 });
export function pageMeta(title: string, description: string, type = 'website') {
  const fullTitle = `${title} — KAADA PREDICTZ`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: type }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
export const settled = (status: string) => ['won', 'lost', 'void'].includes(status);