import { queryOptions } from '@tanstack/react-query';
import { getPublicContent } from './content.functions';
export const publicContentQuery = queryOptions({ queryKey: ['public-content'], queryFn: () => getPublicContent(), staleTime: 30_000 });
export function pageMeta(title: string, description: string, type = 'website') {
  const fullTitle = `${title} — KAADA PREDICTZ`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: type }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
export const settled = (status: string) => ['won', 'lost', 'void'].includes(status);
type SettingRow = { key: string; value: unknown };
/** Read an admin-managed site setting as a plain object. */
export function getSetting(settings: SettingRow[] | undefined, key: string): Record<string, any> {
  const v = settings?.find((s) => s.key === key)?.value;
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, any>) : {};
}
export const str = (v: unknown, fallback = '') => (typeof v === 'string' && v.trim() ? v : fallback);
