import { createClient } from "@supabase/supabase-js";
import { SupabaseDatabase } from "../../types/db/supabase/supabase";

export const supabase = createClient<SupabaseDatabase>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);
