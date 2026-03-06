import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request, url }) => {
    // 1. Extract query params
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    const dateFilter = url.searchParams.get('date_filter') || ''; // Default filter

    const cookieHeader = request.headers.get('cookie') || '';

    try {
        // 2. Build API URL with the date filter
        const apiUrl = new URL(`http://127.0.0.1:8000/api/v1/jobs`);
        apiUrl.searchParams.set('page', page);
        apiUrl.searchParams.set('limit', limit);
        apiUrl.searchParams.set('date_filter', dateFilter);

        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'cookie': cookieHeader
            }
        });

        if (response.status === 401) {
            const redirectTo = url.pathname + url.search;
            throw redirect(307, `/auth/signin?redirectTo=${encodeURIComponent(redirectTo)}`);
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw error(response.status, {
                message: data.detail || "Failed to load jobs."
            });
        }

        return {
            jobs: data.jobs || [],
            totalCount: data.count || 0,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            activeFilter: dateFilter // Return this so the UI knows which chip to highlight
        };

    } catch (err) {
        if (err && typeof err === 'object' && ('status' in err || 'location' in err)) throw err;
        console.error("Jobs Fetch Error:", err);
        throw error(500, "The HVAC API server is unreachable.");
    }
};