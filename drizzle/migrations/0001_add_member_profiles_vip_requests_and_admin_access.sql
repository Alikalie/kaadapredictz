ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_status text NOT NULL DEFAULT 'free';

CREATE TABLE public.vip_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  package_id uuid REFERENCES public.vip_packages(id) ON DELETE SET NULL,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.vip_requests TO authenticated;
GRANT ALL ON public.vip_requests TO service_role;
ALTER TABLE public.vip_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members create VIP requests" ON public.vip_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND status = 'pending');
CREATE POLICY "Members view own VIP requests" ON public.vip_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins manage VIP requests" ON public.vip_requests FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));
CREATE INDEX vip_requests_user_created_idx ON public.vip_requests(user_id, created_at DESC);

CREATE POLICY "Super admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins update profiles" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE OR REPLACE FUNCTION public.is_site_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','content_admin','support_admin','prediction_analyst')) $$;
GRANT EXECUTE ON FUNCTION public.is_site_admin(uuid) TO authenticated;

CREATE POLICY "Site admins view feedback" ON public.feedback FOR SELECT TO authenticated USING (public.is_site_admin(auth.uid()));
CREATE POLICY "Site admins update feedback" ON public.feedback FOR UPDATE TO authenticated USING (public.is_site_admin(auth.uid())) WITH CHECK (public.is_site_admin(auth.uid()));
CREATE POLICY "Super admins delete feedback" ON public.feedback FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'super_admin'));
