import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request, url }) => {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    const dateFilter = url.searchParams.get('date_filter') || ''; 
    const status = url.searchParams.get('status') || ''; // Capture status

    const cookieHeader = request.headers.get('cookie') || '';

    try {
        const apiUrl = new URL(`http://127.0.0.1:8000/api/v1/jobs`);
        apiUrl.searchParams.set('page', page);
        apiUrl.searchParams.set('limit', limit);
        if (dateFilter) apiUrl.searchParams.set('date_filter', dateFilter);
        if (status) apiUrl.searchParams.set('status', status);

        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: { 'accept': 'application/json', 'cookie': cookieHeader }
        });

        if (response.status === 401) {
            const redirectTo = url.pathname + url.search;
            throw redirect(307, `/auth/signin?redirectTo=${encodeURIComponent(redirectTo)}`);
        }

        const data = await response.json().catch(() => ({}));

        return {
            jobs: data.jobs || [],
            totalCount: data.count || 0,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            activeDateFilter: dateFilter,
            activeStatus: status // Return this for UI highlighting
        };
    } catch (err) {
        if (err && typeof err === 'object' && ('status' in err || 'location' in err)) throw err;
        throw error(500, "The HVAC API server is unreachable.");
    }
};