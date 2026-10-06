import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { PageHeader } from '@/components/site-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { pageMeta } from '@/lib/public-content';
import { sendFeedback } from '@/lib/feedback.functions';
export const Route = createFileRoute('/contact')({ head: () => pageMeta('Contact', 'Send questions and feedback to KAADA PREDICTZ.'), component: Contact });
function Contact() { const send = useServerFn(sendFeedback); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false); return <><PageHeader eyebrow="Get in touch" title="Contact KAADA PREDICTZ" copy="Questions, corrections and feedback." /><form className="mx-auto grid max-w-2xl gap-5 px-4 py-12" onSubmit={async e => { e.preventDefault(); const form = e.currentTarget; const d = new FormData(form); setBusy(true); setMessage(''); try { const r = await send({ data: { full_name: String(d.get('full_name')), email: String(d.get('email')), subject: String(d.get('subject')), message: String(d.get('message')) } }); setMessage(`Message received. Reference: ${r.reference}`); form.reset(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Message could not be sent.'); } finally { setBusy(false); } }}>{[['Name','full_name','text'],['Email','email','email'],['Subject','subject','text']].map(([label,name,type]) => <label key={name} className="grid gap-2 text-sm">{label}<Input name={name} type={type} required maxLength={name === 'email' ? 254 : 150} /></label>)}<label className="grid gap-2 text-sm">Message<Textarea name="message" required minLength={10} maxLength={4000} rows={6} /></label><Button disabled={busy} type="submit"><Send />{busy ? 'Sending…' : 'Send message'}</Button>{message && <p role="status" className="text-sm text-primary">{message}</p>}</form></>; }