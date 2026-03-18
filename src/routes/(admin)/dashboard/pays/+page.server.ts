// +page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '100';
    const employee = url.searchParams.get('employee') || '';

    const apiUrl = new URL('http://127.0.0.1:8000/api/v1/pays');
    apiUrl.searchParams.set('page', page);
    apiUrl.searchParams.set('limit', limit);

    if (employee) {
        apiUrl.searchParams.set('employee', employee);
    }

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
        throw error(response.status, 'Failed to fetch pays');
    }

    const pays = await response.json();
    console.log(pays)


    return {
        pays: Array.isArray(pays) ? pays : [],

        response: pays.response,
        searchQuery: employee
    };
};