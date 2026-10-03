CREATE TYPE public.app_role AS ENUM ('super_admin','content_admin','support_admin','prediction_analyst');
CREATE TYPE public.content_status AS ENUM ('draft','published','archived');
CREATE TYPE public.prediction_status AS ENUM ('draft','published','pending','won','lost','void');
CREATE TYPE public.feedback_status AS ENUM ('new','open','in_progress','replied','closed');

CREATE TABLE public.profiles (id uuid PRIMARY KEY, full_name text, avatar_url text, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are visible to owner" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, role public.app_role NOT NULL DEFAULT 'prediction_analyst', UNIQUE(user_id, role));
GRANT SELECT ON public.user_roles TO authenticated; GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.prediction_categories (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, slug text NOT NULL UNIQUE, description text NOT NULL DEFAULT '', sort_order int NOT NULL DEFAULT 0, is_active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.prediction_categories TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.prediction_categories TO authenticated; GRANT ALL ON public.prediction_categories TO service_role;
ALTER TABLE public.prediction_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active categories are public" ON public.prediction_categories FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Editors manage categories" ON public.prediction_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin') OR public.has_role(auth.uid(),'prediction_analyst')) WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin') OR public.has_role(auth.uid(),'prediction_analyst'));

CREATE TABLE public.predictions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, league text NOT NULL, home_team text NOT NULL, away_team text NOT NULL, kickoff timestamptz NOT NULL, category_id uuid REFERENCES public.prediction_categories(id) ON DELETE SET NULL, market text NOT NULL, selection text NOT NULL, odds numeric(6,2) NOT NULL, confidence int NOT NULL DEFAULT 70 CHECK (confidence BETWEEN 0 AND 100), analysis text NOT NULL DEFAULT '', venue text, status public.prediction_status NOT NULL DEFAULT 'draft', is_featured boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.predictions TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.predictions TO authenticated; GRANT ALL ON public.predictions TO service_role;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published predictions are public" ON public.predictions FOR SELECT TO anon, authenticated USING (status IN ('published','pending','won','lost','void') OR public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin') OR public.has_role(auth.uid(),'prediction_analyst'));
CREATE POLICY "Prediction team manages predictions" ON public.predictions FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin') OR public.has_role(auth.uid(),'prediction_analyst')) WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin') OR public.has_role(auth.uid(),'prediction_analyst'));
CREATE INDEX predictions_kickoff_idx ON public.predictions(kickoff); CREATE INDEX predictions_category_idx ON public.predictions(category_id);

CREATE TABLE public.articles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, excerpt text NOT NULL DEFAULT '', content text NOT NULL DEFAULT '', category text NOT NULL DEFAULT 'Guides', author text NOT NULL DEFAULT 'KAADA Editorial', read_minutes int NOT NULL DEFAULT 5, status public.content_status NOT NULL DEFAULT 'draft', published_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.articles TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated; GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles are public" ON public.articles FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin'));
CREATE POLICY "Content team manages articles" ON public.articles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_admin'));

CREATE TABLE public.vip_packages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, slug text NOT NULL UNIQUE, price numeric(10,2) NOT NULL, currency text NOT NULL DEFAULT 'USD', duration_days int NOT NULL, description text NOT NULL DEFAULT '', benefits text[] NOT NULL DEFAULT '{}', is_active boolean NOT NULL DEFAULT true, sort_order int NOT NULL DEFAULT 0);
GRANT SELECT ON public.vip_packages TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.vip_packages TO authenticated; GRANT ALL ON public.vip_packages TO service_role;
ALTER TABLE public.vip_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active VIP packages are public" ON public.vip_packages FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins manage VIP packages" ON public.vip_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.feedback (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), reference text NOT NULL UNIQUE, full_name text NOT NULL, email text NOT NULL, whatsapp text, subject text NOT NULL, category text NOT NULL, message text NOT NULL, attachment_url text, status public.feedback_status NOT NULL DEFAULT 'new', created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.feedback TO anon, authenticated; GRANT SELECT, UPDATE, DELETE ON public.feedback TO authenticated; GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit feedback" ON public.feedback FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Support team manages feedback" ON public.feedback FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'support_admin'));
CREATE POLICY "Support team updates feedback" ON public.feedback FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'support_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'support_admin'));

CREATE TABLE public.newsletter_subscribers (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, is_active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated; GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated; GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (is_active);
CREATE POLICY "Super admins manage subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.site_settings (key text PRIMARY KEY, value jsonb NOT NULL DEFAULT '{}', is_public boolean NOT NULL DEFAULT true, updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.site_settings TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated; GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public settings are readable" ON public.site_settings FOR SELECT TO anon, authenticated USING (is_public OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.navigation_items (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), label text NOT NULL, url text NOT NULL, parent_id uuid REFERENCES public.navigation_items(id) ON DELETE CASCADE, sort_order int NOT NULL DEFAULT 0, is_active boolean NOT NULL DEFAULT true, new_tab boolean NOT NULL DEFAULT false);
GRANT SELECT ON public.navigation_items TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.navigation_items TO authenticated; GRANT ALL ON public.navigation_items TO service_role;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active navigation is public" ON public.navigation_items FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins manage navigation" ON public.navigation_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.page_sections (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), page_slug text NOT NULL, section_type text NOT NULL, heading text, content jsonb NOT NULL DEFAULT '{}', sort_order int NOT NULL DEFAULT 0, is_active boolean NOT NULL DEFAULT true);
GRANT SELECT ON public.page_sections TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.page_sections TO authenticated; GRANT ALL ON public.page_sections TO service_role;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active sections are public" ON public.page_sections FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Super admins manage sections" ON public.page_sections FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.advertisements (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, placement text NOT NULL, content text NOT NULL, destination_url text, device text NOT NULL DEFAULT 'all', priority int NOT NULL DEFAULT 0, starts_at timestamptz, ends_at timestamptz, is_active boolean NOT NULL DEFAULT true);
GRANT SELECT ON public.advertisements TO anon, authenticated; GRANT INSERT, UPDATE, DELETE ON public.advertisements TO authenticated; GRANT ALL ON public.advertisements TO service_role;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active advertisements are public" ON public.advertisements FOR SELECT TO anon, authenticated USING (is_active AND (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at >= now()));
CREATE POLICY "Super admins manage advertisements" ON public.advertisements FOR ALL TO authenticated USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.audit_logs (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, actor_id uuid NOT NULL, action text NOT NULL, entity_type text NOT NULL, entity_id text, details jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT ON public.audit_logs TO authenticated; GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins view audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "Admins create audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (actor_id = auth.uid());