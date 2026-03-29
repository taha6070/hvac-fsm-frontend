import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, params, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await fetch(`${PUBLIC_API_URL}/jobs/${params.jbid}`, {
        headers: {
            'accept': 'application/json',
            'cookie': cookieHeader
        }
    });

    if (!response.ok) {
        throw error(response.status, 'Could not find this job.');
    }

    const data = await response.json();
    return { details: data };
};

export const actions: Actions = {
    markDone: async ({ fetch, params, request }) => {
        const cookieHeader = request.headers.get('cookie') || '';

        try {
            const response = await fetch(`${PUBLIC_API_URL}/jobs/technican/${params.jbid}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'cookie': cookieHeader
                },
                body: JSON.stringify({ status: 'done' })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                return fail(response.status, {
                    message: data.detail || "Failed to update job status."
                });
            }

            return { success: true, message: "Job completed successfully!" };

        } catch (err) {
            return fail(500, { message: "Internal server error." });
        }
    }
};