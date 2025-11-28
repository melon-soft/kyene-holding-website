import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your project's URL and Anon Key
const supabaseUrl = 'https://gkcuajkyflwewqtojngb.supabase.co';
// FIX: Updated the public anon key for your Supabase project with the new one provided.
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrY3Vhamt5Zmx3ZXdxdG9qbmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjQwNjAsImV4cCI6MjA3ODc0MDA2MH0.92AI_1r3m8I8oxHavtgdDpqeKI1F9MxIY66QzGZSFeg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);