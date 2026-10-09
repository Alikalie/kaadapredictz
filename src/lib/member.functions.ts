import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const saveMyProfile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ full_name: z.string().trim().min(2).max(120), phone: z.string().trim().max(40), country: z.string().trim().max(80) }).parse(input)).handler(async ({ data, context }) => { const { error } = await context.supabase.from('profiles').upsert({ id: context.userId, ...data }); if (error) throw new Error('Your profile could not be saved.'); return { ok: true }; });
export const requestVip = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ package_id: z.string().uuid(), message: z.string().trim().max(1000) }).parse(input)).handler(async ({ data, context }) => { const { error } = await context.supabase.from('vip_requests').insert({ user_id: context.userId, ...data }); if (error) throw new Error('Your VIP request could not be sent.'); return { ok: true }; });
export const getMyAccount = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const [profile, requests, roles, subscription, predictions] = await Promise.all([
    context.supabase.from('profiles').select('*').eq('id', context.userId).maybeSingle(),
    context.supabase.from('vip_requests').select('id,status,message,created_at,vip_packages(name,price,currency,duration_days)').eq('user_id', context.userId).order('created_at', { ascending: false }),
    context.supabase.from('user_roles').select('role').eq('user_id', context.userId),
    context.supabase.from('vip_subscriptions').select('expires_at').eq('user_id', context.userId).maybeSingle(),
    context.supabase.from('predictions').select('*,prediction_categories(name,slug)').eq('access_level','vip').neq('status','draft').order('kickoff'),
  ]);
  const error = profile.error ?? requests.error ?? roles.error ?? subscription.error ?? predictions.error;
  if (error) throw new Error(error.message);
  return { email: (context.claims as { email?: string }).email ?? '', profile: profile.data, requests: requests.data ?? [], roles: (roles.data ?? []).map(r => r.role), subscription: subscription.data, vipPredictions: predictions.data ?? [] };
});
