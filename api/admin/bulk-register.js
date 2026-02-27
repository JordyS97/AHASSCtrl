import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { emails } = req.body;
    if (!Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ error: 'Array of emails is required' });
    }

    // Limit to 50 per batch
    if (emails.length > 50) {
        return res.status(400).json({ error: 'Maximum 50 users per batch' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });

    const results = [];

    for (const email of emails) {
        if (!email || !email.includes('@')) {
            results.push({ email, success: false, error: 'Invalid email' });
            continue;
        }

        try {
            const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email: email.trim(),
                password: 'AstraMotor@2026',
                email_confirm: true
            });

            if (error) throw error;
            results.push({ email, success: true, userId: data.user.id });
        } catch (err) {
            results.push({ email, success: false, error: err.message });
        }
    }

    const succeeded = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return res.status(200).json({
        total: emails.length,
        succeeded,
        failed,
        results
    });
}
