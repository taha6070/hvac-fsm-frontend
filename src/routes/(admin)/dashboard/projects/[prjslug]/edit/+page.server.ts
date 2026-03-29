import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const prjSlug = params.prjslug;

    const res = await fetch(`${PUBLIC_API_URL}/projects/${prjSlug}?includejobs=false`);

    if (!res.ok) {
        throw error(404, 'Project not found');
    }

    const project = await res.json();

    // If the project has a customer_id, we might want to fetch that customer's details
    let customer = null;
    if (project.customer_id) {
        const customerRes = await fetch(`${PUBLIC_API_URL}/contacts/${project.customer_id}`);
        if (customerRes.ok) {
            customer = await customerRes.json();
        }
    }

    return {
        project,
        customer
    };
};
