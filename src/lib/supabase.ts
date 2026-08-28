import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ziugkjvrxnkxkjvhpqyq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_gKPHaOCcXLPsoxpUFmnEaA_vs8h0gp4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
