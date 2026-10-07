import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
export const sendFeedback = createServerFn({ method: 'POST' }).inputValidator(input => z.object({ full_name: z.string().trim().min(2).max(100), email: z.string().email().max(254), whatsapp: z.string().trim().max(40), subject: z.string().trim().min(2).max(150), message: z.string().trim().min(10).max(4000) }).parse(input)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const reference = `KP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const { error } = await supabaseAdmin.from('feedback').insert({ ...data, category: 'general', reference });
  if (error) throw new Error('Your message could not be sent. Please try again.');
  return { reference };
});