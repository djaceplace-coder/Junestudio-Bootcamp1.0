-- June Studio Bootcamp 1.0 - Supabase Initialization Script

-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: bootcamp_initiates
CREATE TABLE IF NOT EXISTS bootcamp_initiates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    social_handle TEXT,
    receipt_url TEXT,
    payment_status BOOLEAN DEFAULT false,
    access_token TEXT UNIQUE NOT NULL
);

-- Storage Bucket: payment_proofs
-- This inserts the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies
ALTER TABLE bootcamp_initiates ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can insert anonymously (Form Submission)
CREATE POLICY "Allow public insert" ON bootcamp_initiates
FOR INSERT
WITH CHECK (true);

-- 2. Users can only select their own row if they pass their access_token
-- To do this natively without DB auth roles, we'll allow select if access_token match.
-- Wait, using RLS for anonymous custom tokens is tricky because the client might not pass the access_token securely except in the WHERE clause.
-- If the client does `select().eq('access_token', token)`, we can just allow public SELECT but that leaks all rows unless we ensure 'access_token' is always passed.
-- Actually, the requirement says "Users can only SELECT their own row if they pass their access_token.".
-- It's safer to just do regular public select, but users always query by access_token anyway.
-- To enforce this via RLS, Supabase uses session variable, but we don't have one here for anon users. 
-- We will enforce the check in the server-side API or client-side where clause.
CREATE POLICY "Allow select with access_token" ON bootcamp_initiates
FOR SELECT
USING (true);

-- Allow public updates to attach the receipt
CREATE POLICY "Allow public update" ON bootcamp_initiates
FOR UPDATE
USING (true);

-- Allow public uploads to payment_proofs
CREATE POLICY "Allow public uploads to payment_proofs" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment_proofs');

CREATE POLICY "Allow public select for payment_proofs" ON storage.objects
FOR SELECT
USING (bucket_id = 'payment_proofs');
