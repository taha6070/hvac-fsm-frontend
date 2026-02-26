import { redirect, error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request, url }) => {
    // 1. Extract query params for pagination
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    // 2. Capture the cookie header from the incoming request (as per your working method)
    const cookieHeader = request.headers.get('cookie') || '';

    try {
        const apiUrl = `http://127.0.0.1:8000/api/v1/jobs?page=${page}&limit=${limit}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'cookie': cookieHeader // Injecting the cookies manually
            }
        });

        // 3. Handle Unauthorized (401)
        if (response.status === 401) {
            const redirectTo = url.pathname + url.search;
            throw redirect(307, `/auth/signin?redirectTo=${encodeURIComponent(redirectTo)}`);
        }

        // 4. Safely parse JSON
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw error(response.status, {
                message: data.detail || "Failed to load jobs from the backend."
            });
        }

        // 5. Return data to the table
        return {
            jobs: data.jobs || [],
            totalCount: data.count || 0,
            currentPage: parseInt(page),
            limit: parseInt(limit)
        };

    } catch (err) {
        // If it's a SvelteKit redirect or error, re-throw it
        if (err && typeof err === 'object' && ('status' in err || 'location' in err)) {
            throw err;
        }

        console.error("Jobs Fetch Error:", err);
        throw error(500, "The HVAC API server is unreachable.");
    }
};