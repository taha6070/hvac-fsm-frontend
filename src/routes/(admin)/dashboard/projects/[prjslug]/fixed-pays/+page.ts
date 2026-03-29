import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
export const load: PageLoad = async ({ params, fetch, url }) => {
    // Get prj_id from URL, default to 1 if not present
    const prjId = params.prjslug;
    const page = url.searchParams.get('page') || '1';


    const apiUrl = `${PUBLIC_API_URL}/helper/pays?page=${page}&limit=10&prj_id=${prjId}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
        pays: Array.isArray(data) ? data : [],
        prjId
    };
};