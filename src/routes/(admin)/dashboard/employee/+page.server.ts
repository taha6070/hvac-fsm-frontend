import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    
    // Get search and pagination params from the URL
    const name = url.searchParams.get('name') || '';
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '100';

    // Construct the API URL
    let apiUrl = `http://127.0.0.1:8000/api/v1/employees?page=${page}&limit=${limit}`;
    if (name) {
        apiUrl += `&name=${encodeURIComponent(name)}`;
    }

    const response = await fetch(apiUrl, {
        headers: {
            'accept': 'application/json',
            'cookie': cookieHeader
        }
    });

    if (!response.ok) {
        throw error(response.status, 'Failed to fetch employees');
    }

    const data = await response.json();

    return {
        employees: data.response || data, // Handles both list or wrapped response
        totalCount: data.count || 0,
        totalPages: data.total_pages || 1,
        currentPage: parseInt(page),
        searchTerm: name
    };
};