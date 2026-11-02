import { describe, expect, it } from 'vitest';
import { canReadVipOdds, vipOddsSchema } from '@/lib/vip-odds';
describe('Admin-updated VIP odds', () => {
  it('keeps the entered odds and match analysis', () => {
    const saved = vipOddsSchema.parse({ league: 'Premier League', home_team: 'Arsenal', away_team: 'Chelsea', kickoff: '2026-11-03T20:00:00Z', market: 'Match winner', selection: 'Arsenal', odds: 2.35, confidence: 72, analysis: 'Home advantage; lineup uncertainty increases risk.', status: 'published' });
    expect(saved.odds).toBe(2.35); expect(saved.analysis).toBe('Home advantage; lineup uncertainty increases risk.');
  });
  it('denies members without an active subscription', () => { expect(canReadVipOdds([], null)).toBe(false); });
  it('revokes access at the exact subscription expiry', () => { const now = Date.parse('2026-11-03T20:00:00Z'); expect(canReadVipOdds([], '2026-11-03T20:00:00Z', now)).toBe(false); expect(canReadVipOdds([], '2026-11-03T20:00:01Z', now)).toBe(true); });
  it('allows super admin preview without a subscription', () => { expect(canReadVipOdds(['super_admin'], null)).toBe(true); });
});