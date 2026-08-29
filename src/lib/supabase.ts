import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables with fallbacks to avoid build-time prerender crashes on Vercel
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : "https://placeholder.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

// Public Supabase Client (Client-Side & Public Reads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-Side Supabase Admin Client (Bypasses RLS using Service Role Key)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
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

/**
 * 4. News Table Interface
 */
export interface NewsItem {
  id?: string;
  title: string;
  content: string;
  date: string;
  is_active: boolean;
  image_url?: string;
  created_at?: string;
}
