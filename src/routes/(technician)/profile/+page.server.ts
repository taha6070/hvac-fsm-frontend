import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
    resetPassword: async ({ request, fetch }) => {
        const data = await request.formData();
        const current_password = data.get('current_password');
        const new_password = data.get('new_password');
        const confirm_password = data.get('confirm_password');

        if (!current_password || !new_password || !confirm_password) {
            return fail(400, { error: 'All fields are required' });
        }

        if (new_password !== confirm_password) {
            return fail(400, { error: 'New passwords do not match' });
        }

        // Get cookies from the incoming request to forward to the API
        const cookieHeader = request.headers.get('cookie');

        try {
            const response = await fetch(`${PUBLIC_API_URL}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    // Forward the cookie header if it exists
                    ...(cookieHeader ? { 'Cookie': cookieHeader } : {})
                },
                body: JSON.stringify({
                    current_password,
                    new_password,
                    confirm_password
                })
            });

            if (!response.ok) {
                // Try to parse the error message from the API, if available
                let errorMessage = 'Failed to reset password';
                try {
                    const errorData = await response.json();
                    // Handle common error payload structures
                    errorMessage = errorData.detail || errorData.message || errorData.error || errorMessage;
                    if (typeof errorMessage !== 'string') {
                        errorMessage = JSON.stringify(errorMessage);
                    }
                } catch (e) {
                    // Ignore JSON parsing error
                }
                return fail(response.status, { error: errorMessage });
            }

            return { success: true, message: 'Password reset successfully!' };
        } catch (error) {
            console.error('Password reset error:', error);
            return fail(500, { error: 'Internal server error. Please try again later.' });
        }
    }
} satisfies Actions;
