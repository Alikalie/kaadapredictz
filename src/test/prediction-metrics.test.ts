import {describe,it,expect} from 'vitest';
import {predictionMetrics,vipActive} from '@/lib/prediction-metrics';
describe('VIP access',()=>{
 it('expires at the exact admin-set date',()=>{const time=Date.parse('2026-10-09T12:00:00Z');expect(vipActive('2026-10-09T12:00:00Z',time)).toBe(false);expect(vipActive('2026-10-09T12:00:01Z',time)).toBe(true);expect(vipActive(null,time)).toBe(false)});
});
describe('Recorded accuracy',()=>{
 it('counts wins and losses, excluding void and unresolved predictions',()=>{const m=predictionMetrics(['won','won','lost','void','pending','draft'].map(status=>({status,kickoff:'2026-10-09T12:00:00Z'})));expect(m.accuracy).toBe(67);expect(m.pending).toBe(1);expect(m.void).toBe(1)});
 it('groups results by recording month',()=>{const m=predictionMetrics([{status:'won',kickoff:'2026-09-30T12:00:00Z',result_recorded_at:'2026-10-01T10:00:00Z'}]);expect(m.months[0]?.month).toBe('2026-10');expect(m.months[0]?.won).toBe(1)});
});