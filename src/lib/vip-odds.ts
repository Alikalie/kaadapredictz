import { z } from 'zod';

export const VIP_ODDS_REFRESH_MS = 15_000;
export const vipOddsSchema = z.object({
  id: z.string().uuid().optional(),
  league: z.string().trim().min(2).max(120),
  home_team: z.string().trim().min(2).max(120),
  away_team: z.string().trim().min(2).max(120),
  kickoff: z.string().datetime({ offset: true }),
  market: z.string().trim().min(1).max(120),
  selection: z.string().trim().min(1).max(120),
  odds: z.coerce.number().gt(1).max(10000),
  confidence: z.coerce.number().int().min(0).max(100),
  analysis: z.string().trim().min(1).max(12000),
  status: z.enum(['draft', 'published', 'pending', 'won', 'lost', 'void']),
});
export function canReadVipOdds(roles: string[], expiresAt: string | null | undefined, now = Date.now()) {
  return roles.includes('super_admin') || Boolean(expiresAt && Date.parse(expiresAt) > now);
}