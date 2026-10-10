import {describe,it,expect} from 'vitest';
import {canExplainPrediction} from '@/lib/prediction-explanation';
describe('Published prediction explanations',()=>{
 it('allows published and recorded outcomes',()=>{for(const status of ['published','pending','won','lost','void']) expect(canExplainPrediction(status)).toBe(true)});
 it('rejects drafts and arbitrary statuses',()=>{expect(canExplainPrediction('draft')).toBe(false);expect(canExplainPrediction('user-submitted')).toBe(false)});
});