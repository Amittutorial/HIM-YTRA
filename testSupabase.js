import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const { data, error } = await supabase.from('bookings').select('*').limit(1);
    if (error) {
      console.error('Error querying bookings:', error.message);
    } else {
      console.log('Bookings sample:', data);
    }
  } catch (e) {
    console.error('Exception:', e);
  }
}

test();
