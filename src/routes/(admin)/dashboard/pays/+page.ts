import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '30';
    const employee = url.searchParams.get('employee') || '';

    const apiUrl = new URL('http://127.0.0.1:8000/api/v1/pays');
    apiUrl.searchParams.set('page', page);
    apiUrl.searchParams.set('limit', limit);
    
    if (employee) {
        apiUrl.searchParams.set('employee', employee);
    }

    const response = await fetch(apiUrl.toString());
    const pays = await response.json();

    return {
        pays: Array.isArray(pays) ? pays : [],
        searchQuery: employee
    };
};