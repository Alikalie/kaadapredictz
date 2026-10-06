import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
export function CategoryButtons({ categories, selected }: { categories: { id: string; name: string; slug: string }[]; selected?: string }) {
  return <nav aria-label="Prediction categories" className="mb-8 flex flex-wrap gap-2"><Button asChild size="sm" variant={selected ? 'outline' : 'default'}><Link to="/predictions">All tips</Link></Button>{categories.map(c => <Button asChild key={c.id} size="sm" variant={selected === c.slug ? 'default' : 'outline'}><Link to="/predictions/$category" params={{ category: c.slug }}>{c.name}</Link></Button>)}</nav>;
}