import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, url }) => {
    // 1. Extract query params from the current page URL
    // Default to page 1 and limit 10 if not present
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '100';
    const jobtype = url.searchParams.get('jobtype') || '';

    // 2. Construct the backend API URL
    const apiUrl = new URL(`${PUBLIC_API_URL}/payrolls`);
    apiUrl.searchParams.set('page', page);
    apiUrl.searchParams.set('limit', limit);

    // Only append jobtype if the user actually typed something
    if (jobtype) {
        apiUrl.searchParams.set('jobtype', jobtype);
    }

    // 3. Fetch data from your FastAPI/Backend
    const response = await fetch(apiUrl.toString(), {
        headers: {
            'accept': 'application/json'
        }
    });

    if (!response.ok) {
        return {
            jobs: [],
            total: 0,
            error: 'Failed to fetch payroll data'
        };
    }

    const payrolls = await response.json();

    // 4. Return the data to the UI
    return {
        jobs: payrolls, // This matches the array in your JSON example
        total: payrolls.length, // Or use a total count if your API provides one
        params: { page, limit, jobtype } // Useful for persistence in the UI
    };
};