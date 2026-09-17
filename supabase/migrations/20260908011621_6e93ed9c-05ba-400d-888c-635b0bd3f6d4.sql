CREATE TABLE public.scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  what text NOT NULL,
  pain text NOT NULL,
  lang text NOT NULL,
  result jsonb,
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.scans TO anon, authenticated;
GRANT ALL ON public.scans TO service_role;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a scan" ON public.scans FOR INSERT TO anon, authenticated WITH CHECK (true);