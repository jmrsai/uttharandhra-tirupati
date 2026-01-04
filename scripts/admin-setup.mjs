/**
 * Uttharandhra Tirupati - Admin Setup Script (Server-side/Node.js)
 * 🛡️ This script uses the Supabase SERVICE_ROLE_KEY to create admin users.
 * ⚠️ NEVER expose this key in the frontend application.
 * 
 * Usage:
 * 1. Ensure you have @supabase/supabase-js installed (npm install @supabase/supabase-js)
 * 2. Set your environment variables (VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)
 * 3. Run: node scripts/admin-setup.mjs <email> <password> <full_name>
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config(); // Load from .env if present

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
    console.error('❌ Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in your environment or .env file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('📖 Usage: node scripts/admin-setup.mjs <email> <password> <full_name>');
    process.exit(0);
}

const [email, password, fullName] = args;

async function createAdmin() {
    console.log(`🚀 Creating admin user: ${email}...`);

    // 1. Create the user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName }
    });

    if (authError) {
        console.error('❌ Auth Error:', authError.message);
        return;
    }

    const userId = authData.user.id;
    console.log(`✅ Auth user created with ID: ${userId}`);

    // 2. Ensuring the profile exists and is 'admin'
    // We use upsert to create it if the trigger failed, or update if it exists.
    console.log(`🛡️ Promoting user to admin...`);

    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            full_name: fullName,
            role: 'admin',
            updated_at: new Date().toISOString()
        });

    if (profileError) {
        console.error('❌ Profile Error:', profileError.message);
    } else {
        console.log(`🎉 SUCCESS: ${email} is now an Admin!`);
    }
}

createAdmin();
