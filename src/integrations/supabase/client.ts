import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/free-trial';

const SUPABASE_URL = "https://cqntgeuufdfchheisjxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnRnZXV1ZmRmY2hoZWlzanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODE2MTEsImV4cCI6MjA1MDQ1NzYxMX0.VIHCmOX7Dcgv-Kfm3tXXQKpx1mmrNEe7cmHOOcCOKhY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);