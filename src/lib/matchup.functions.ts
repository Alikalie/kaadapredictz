import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const analyzeMatchup = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ home: z.string().trim().min(2).max(100), away: z.string().trim().min(2).max(100), kickoff: z.string().max(40), league: z.string().trim().max(100) }).refine(d => d.home.toLowerCase() !== d.away.toLowerCase(), 'Choose two different teams.').parse(input))
  .handler(async ({ data, context }) => {
    const { data: predictions, error } = await context.supabase.from('predictions').select('id,slug,home_team,away_team,league,kickoff,selection,market,odds,status,analysis,confidence').neq('status','draft').order('kickoff', { ascending: false }).limit(500);
    if (error) throw new Error('Prediction data could not be loaded.');
    const { produceMatchup } = await import('./matchup.server');
    return produceMatchup(getRequest(), data, predictions ?? []);
  });