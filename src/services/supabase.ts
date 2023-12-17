import { createClient } from "@supabase/supabase-js";
import { Database } from "@/models/database.types";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// since we have row level security (RLS) in supabase, it does not matter if client sees the key. though we still use .env
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
