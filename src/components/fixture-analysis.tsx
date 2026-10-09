import {useState} from 'react';
import {useServerFn} from '@tanstack/react-start';
import {Activity} from 'lucide-react';
import {analyzeFixture} from '@/lib/fixture.functions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
export function FixtureAnalysis(){
 const analyze=useServerFn(analyzeFixture);const[busy,setBusy]=useState(false);const[text,setText]=useState('');const[error,setError]=useState('');
 return <section className="mt-10 border-t border-border pt-8"><p className="eyebrow">Member match lab</p><h2 className="mt-2 font-display text-2xl font-black">Analyze an upcoming fixture</h2><form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={async e=>{e.preventDefault();const form=new FormData(e.currentTarget);setBusy(true);setError('');setText('');try{const result=await analyze({data:{home:String(form.get('home')),away:String(form.get('away')),competition:String(form.get('competition')),kickoff:new Date(String(form.get('kickoff'))).toISOString(),details:String(form.get('details'))}});setText(result.text)}catch(err){setError(err instanceof Error?err.message:'Analysis failed.')}finally{setBusy(false)}}}>{[['home','Home team'],['away','Away team'],['competition','Competition'],['kickoff','Kickoff (local time)']].map(([name,label])=><label className="grid gap-2 text-sm" key={name}>{label}<Input name={name} required={name!=='competition'} type={name==='kickoff'?'datetime-local':'text'} maxLength={100}/></label>)}<label className="grid gap-2 text-sm sm:col-span-2">Form, injuries, lineups or other fixture details<Textarea name="details" rows={4} maxLength={4000}/></label><Button disabled={busy} className="w-fit"><Activity/>{busy?'Analyzing fixture…':'Generate analysis'}</Button></form>{error&&<p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}{text&&<div role="status" className="mt-6 whitespace-pre-wrap text-sm leading-7">{text}</div>}</section>;
}