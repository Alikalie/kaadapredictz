import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('Content service is not configured.');
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
}

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const db = publicClient();
  const [categories, predictions, articles, packages, sections] = await Promise.all([
    db.from('prediction_categories').select('*').eq('is_active',true).order('sort_order'),
    db.from('predictions').select('*, prediction_categories(name,slug)').neq('status','draft').order('kickoff'),
    db.from('articles').select('*').eq('status','published').order('published_at', { ascending: false }),
    db.from('vip_packages').select('*').eq('is_active',true).order('sort_order'),
    db.from('page_sections').select('*').eq('page_slug','home').order('sort_order'),
  ]);
  const error = categories.error ?? predictions.error ?? articles.error ?? packages.error ?? sections.error;
  if (error) throw new Error(error.message);
  return { categories: categories.data ?? [], predictions: predictions.data ?? [], articles: articles.data ?? [], packages: packages.data ?? [], sections: sections.data ?? [] };
});
