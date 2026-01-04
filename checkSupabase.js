import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('countries').select('name').limit(1);
    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('Successfully connected to Supabase!', data);
    }
  } catch (e) {
    console.error('An unexpected error occurred:', e);
  }
}

checkSupabaseConnection();
