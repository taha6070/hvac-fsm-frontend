import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad = async ({ params, fetch, url }) => {
    const prjId = params.prjslug;
    const page = url.searchParams.get('page') || '1';

    // Construct both URLs
    const standardPaysUrl = `${PUBLIC_API_URL}/pays?page=${page}&limit=20&prj_id=${prjId}`;
    const helperPaysUrl = `${PUBLIC_API_URL}/helper/pays?page=${page}&limit=20&prj_id=${prjId}`;
    const contractorPaysUrl = `${PUBLIC_API_URL}/contractor/pays?page=${page}&limit=20&prj_id=${prjId}`;


    // Fetch both simultaneously
    const [standardRes, helperRes, contractRes] = await Promise.all([
        fetch(standardPaysUrl),
        fetch(helperPaysUrl),
        fetch(contractorPaysUrl)
    ]);

    const standardData = await standardRes.json();
    const helperData = await helperRes.json();
    const contractData = await contractRes.json()

    return {
        standardPays: Array.isArray(standardData) ? standardData : (standardData.response || []),
        helperPays: Array.isArray(helperData) ? helperData : (helperData.response || []),
        contractorPays: Array.isArray(contractData) ? contractData : (contractData.response || []),

        prjId,
        currentPage: parseInt(page)
    };
};