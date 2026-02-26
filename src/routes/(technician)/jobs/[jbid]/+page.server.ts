import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    
    // Using the slug from the URL parameters
    const response = await fetch(`http://127.0.0.1:8000/api/v1/jobs/${params.jbid}`, {
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