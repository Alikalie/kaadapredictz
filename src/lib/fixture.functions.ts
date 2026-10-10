import {createServerFn} from '@tanstack/react-start';
import {getRequest} from '@tanstack/react-start/server';
import {z} from 'zod';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {publishedStatuses,canExplainPrediction,predictionExplanationInstructions} from './prediction-explanation';
export const listExplainablePredictions=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data,error}=await context.supabase.from('predictions').select('id,home_team,away_team,selection,status,kickoff').in('status',publishedStatuses).order('kickoff',{ascending:false}).limit(500);
 if(error) throw new Error('Published predictions could not be loaded.');
 return data??[];
});
export const explainPrediction=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({prediction_id:z.string().uuid()}).strict().parse(input)).handler(async({data,context})=>{
 const prediction=await context.supabase.from('predictions').select('home_team,away_team,league,kickoff,market,selection,odds,confidence,analysis,status,result_recorded_at').eq('id',data.prediction_id).maybeSingle();
 if(prediction.error||!prediction.data||!canExplainPrediction(prediction.data.status)) throw new Error('This published prediction is not available to your account.');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const state=await supabaseAdmin.from('ai_gateway_state').select('*').eq('key','fixture-analysis').maybeSingle();
 if(state.error) throw new Error('Analysis availability could not be checked.');
 if(state.data) throw new Error(state.data.message);
 const key=process.env['LOVABLE_API_KEY'];
 if(!key) throw new Error('AI analysis is not configured.');
 const {createResponsesCall}=await import('./ai/responses.server');
 try {
 const {result}=createResponsesCall(getRequest(),{baseURL:'https://ai.gateway.lovable.dev/v1',apiKey:key,model:'openai/gpt-6-astra'},[{role:'user',content:JSON.stringify(prediction.data)}], predictionExplanationInstructions);
 const text=await result.text;
 if(!text.trim()) throw new Error('The model returned no analysis. This request has ended.');
 return {text};
 }catch(error){
 const e=error as {statusCode?:number;responseBody?:string;message?:string};
 let message=e.message??'Analysis could not be completed.';
 try {const body=JSON.parse(e.responseBody??'{}');message=body.message??body.error?.message??message;}catch{}
 if(e.statusCode===402||e.statusCode===403){const saved=await supabaseAdmin.from('ai_gateway_state').upsert({key:'fixture-analysis',status:e.statusCode,message});if(saved.error) throw new Error('Analysis access is blocked. Please contact the administrator.');}
 throw new Error(message);
 }
});