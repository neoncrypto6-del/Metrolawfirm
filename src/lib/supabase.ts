import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jufppmezhzdbzmkdixmp.supabase.co';
const SUPABASE_ANON_KEY =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZnBwbWV6aHpkYnpta2RpeG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzM3NTIsImV4cCI6MjA4ODMwOTc1Mn0.rHW4XL_dbCKKWOuwdUNWAEBfJ7zqsvmHB6WqGtvrQfk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* 
SUPABASE SQL SCHEMA REQUIRED FOR THIS PROJECT:

CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  photo_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/