import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vgeqcpvqfwozfepbgnns.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8rlD7O-E6Ztefjc6MyPENA_RE5RMYVl';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
