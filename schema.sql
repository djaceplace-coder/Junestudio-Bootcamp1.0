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
    payment_status BOOLEAN DEFAULT true,
    access_token TEXT UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Storage Bucket: payment_proofs
-- This inserts the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies
ALTER TABLE bootcamp_initiates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON bootcamp_initiates;
DROP POLICY IF EXISTS "Allow select with access_token" ON bootcamp_initiates;
DROP POLICY IF EXISTS "Allow public update" ON bootcamp_initiates;

-- 1. Anyone can insert anonymously (Form Submission)
CREATE POLICY "Allow public insert" ON bootcamp_initiates
FOR INSERT
TO public
WITH CHECK (true);

-- 2. Allow public to select. The app relies on the random access_token as a gatekeeper.
CREATE POLICY "Allow select with access_token" ON bootcamp_initiates
FOR SELECT
TO public
USING (true);

-- Allow public updates to attach the receipt
CREATE POLICY "Allow public update" ON bootcamp_initiates
FOR UPDATE
TO public
USING (true);

DROP POLICY IF EXISTS "Allow public uploads to payment_proofs" ON storage.objects;
DROP POLICY IF EXISTS "Allow public select for payment_proofs" ON storage.objects;

-- Allow public uploads to payment_proofs
CREATE POLICY "Allow public uploads to payment_proofs" ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment_proofs');

CREATE POLICY "Allow public select for payment_proofs" ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment_proofs');
