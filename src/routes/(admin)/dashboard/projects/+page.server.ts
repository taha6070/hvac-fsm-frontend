import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
export const load: PageServerLoad = async ({ fetch, url, request }) => {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    const title = url.searchParams.get('title') || '';

    const cookieHeader = request.headers.get('cookie') || '';

    // Construct the URL with title search
    let apiUrl = `${PUBLIC_API_URL}/projects?page=${page}&limit=${limit}`;
    if (title) {
        apiUrl += `&title=${encodeURIComponent(title)}`;
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'accept': 'application/json',
                'cookie': cookieHeader
            }
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch projects');
        }

        const data = await response.json();

        return {
            projects: data.projects || [],
            totalCount: data.count || 0,
            totalPages: data.total_pages || 1,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            searchTitle: title
        };
    } catch (err) {
        console.error("Project Fetch Error:", err);
        throw error(500, "Backend server unreachable");
    }
};