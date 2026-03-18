import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const prjSlug = params.prjslug;

    const res = await fetch(`http://127.0.0.1:8000/api/v1/projects/${prjSlug}?includejobs=false`);

    if (!res.ok) {
        throw error(404, 'Project not found');
    }

    const project = await res.json();

    // If the project has a customer_id, we might want to fetch that customer's details
    let customer = null;
    if (project.customer_id) {
        const customerRes = await fetch(`http://127.0.0.1:8000/api/v1/contacts/${project.customer_id}`);
        if (customerRes.ok) {
            customer = await customerRes.json();
        }
    }

    return {
        project,
        customer
    };
};
