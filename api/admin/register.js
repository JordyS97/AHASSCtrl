import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return res.status(500).json({ error: 'Server configuration error: missing environment variables' });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });

    try {
        // Create user with default password
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: 'AstraMotor@2026',
            email_confirm: true // Auto-confirm email
        });

        if (error) throw error;

        return res.status(200).json({
            success: true,
            user: { id: data.user.id, email: data.user.email }
        });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(400).json({ error: err.message });
    }
}
