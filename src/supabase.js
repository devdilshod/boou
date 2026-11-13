import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unjmbeqwivpgvndvmjih.supabase.co';

const supabaseKey = 'sb_publishable_X1YuPLuusOFH8cJNeCE1MQ_MmAuiHx1';

export const supabase = createClient(supabaseUrl, supabaseKey);
