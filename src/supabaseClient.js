import { createClient } from '@supabase/supabase-js';

// Directly set the Supabase URL and API key
const supabaseUrl = 'https://argqhoqvtfafdxoyinux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZ3Fob3F2dGZhZmR4b3lpbnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODc5NzMsImV4cCI6MjA1ODg2Mzk3M30.L5Xt-Iogr9dixnty2Ezl5_fjH_xTOFvg0_WkfOID_pc';

// Check if the URL and API key are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and API key are required.");
}

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
