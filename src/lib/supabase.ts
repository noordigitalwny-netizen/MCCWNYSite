import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ziugkjvrxnkxkjvhpqyq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_gKPHaOCcXLPsoxpUFmnEaA_vs8h0gp4";

// Public Supabase Client (Client-Side & Public Reads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-Side Supabase Admin Client (Bypasses RLS using Service Role Key)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to default public client.");
    return supabase;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// ========================================================
// TypeScript Database Interfaces & Types
// ========================================================

/**
 * 1. Announcements Table Interface
 */
export interface Announcement {
  id?: string;
  message: string;
  is_active: boolean;
  badge?: string;
  action_url?: string;
  action_text?: string;
  created_at?: string;
}

/**
 * 2. Projects Table Interface
 */
export interface Project {
  id?: string;
  title: string;
  description: string;
  status: string; // e.g. 'Active' | 'Completed'
  goal_amount: number;
  raised_amount: number;
  category?: string;
  completed_date?: string;
  impact_note?: string;
  created_at?: string;
}

/**
 * 3. Programs Table Interface
 */
export interface Program {
  id?: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at?: string;
  category?: string;
  schedule?: string;
}
