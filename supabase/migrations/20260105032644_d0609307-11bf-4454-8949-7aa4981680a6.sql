-- Create table for RSVP confirmations
CREATE TABLE public.confirmations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.confirmations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public RSVP form)
CREATE POLICY "Anyone can confirm presence"
ON public.confirmations
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read (for admin page - we'll add simple password protection in UI)
CREATE POLICY "Anyone can view confirmations"
ON public.confirmations
FOR SELECT
USING (true);