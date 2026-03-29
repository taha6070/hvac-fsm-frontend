import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, url, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';

    // Extract parameters from URL
    const name = url.searchParams.get('name') || '';
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '30';

    // Construct API URL with filters
    let apiUrl = `${PUBLIC_API_URL}/contacts?page=${page}&limit=${limit}`;
    if (name) {
        apiUrl += `&name=${encodeURIComponent(name)}`;
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'accept': 'application/json',
                'cookie': cookieHeader
            }
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch contacts');
        }

        const data = await response.json();

        // Note: adjust 'data.response' if your API returns a raw array
        const contacts = Array.isArray(data) ? data : (data.response || []);
        const totalCount = data.count || contacts.length;

        return {
            contacts,
            totalCount,
            totalPages: data.total_pages || Math.ceil(totalCount / parseInt(limit)),
            currentPage: parseInt(page),
            searchTerm: name
        };
    } catch (err) {
        console.error("Contact Fetch Error:", err);
        throw error(500, "Backend unreachable");
    }
};