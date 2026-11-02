import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { canReadVipOdds, vipOddsSchema } from './vip-odds';

export const saveVipOdds = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => vipOddsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'super_admin' });
    if (roleError || !admin) throw new Error('Administrator access required.');
    const { id, ...fields } = data;
    const values = { ...fields, access_level: 'vip', updated_at: new Date().toISOString() };
    const query = id
      ? context.supabase.from('predictions').update(values).eq('id', id).eq('access_level', 'vip')
      : context.supabase.from('predictions').insert({ ...values, slug: `vip-${crypto.randomUUID()}` });
    const { data: saved, error } = await query.select('id').single();
    if (error || !saved) throw new Error('VIP odds could not be saved. Refresh and try again.');
    return { id: saved.id };
  });

export const getVipOddsFeed = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    setResponseHeader('Cache-Control', 'private, no-store');
    const [roles, subscription] = await Promise.all([
      context.supabase.from('user_roles').select('role').eq('user_id', context.userId),
      context.supabase.from('vip_subscriptions').select('expires_at').eq('user_id', context.userId).maybeSingle(),
    ]);
    if (roles.error || subscription.error) throw new Error('VIP access could not be checked.');
    const expiresAt = subscription.data?.expires_at ?? null;
    const allowed = canReadVipOdds((roles.data ?? []).map(r => r.role), expiresAt);
    if (!allowed) return { allowed: false, expiresAt, items: [], checkedAt: new Date().toISOString() };
    const { data, error } = await context.supabase.from('predictions')
      .select('id,league,home_team,away_team,kickoff,market,selection,odds,confidence,analysis,status,updated_at')
      .eq('access_level', 'vip').in('status', ['published', 'pending']).order('kickoff');
    if (error) throw new Error('The latest VIP odds could not be loaded.');
    return { allowed: true, expiresAt, items: data ?? [], checkedAt: new Date().toISOString() };
  });