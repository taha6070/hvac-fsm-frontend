import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const API_BASE = 'http://127.0.0.1:8000';

export const load: PageServerLoad = async ({ fetch, params, request, url }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    
    // 1. Fetch Job Details
    const jobRes = await fetch(`${API_BASE}/api/v1/jobs/${params.jbid}`, {
        headers: { 'accept': 'application/json', 'cookie': cookieHeader }
    });

    if (!jobRes.ok) throw error(jobRes.status, 'Could not find this job.');
    const jobData = await jobRes.json();

    // 2. Optional: Search Products (triggered if 'search' param exists)
    const search = url.searchParams.get('search');
    let productResults = [];
    
    if (search && search.length >= 2) {
        const prodRes = await fetch(`${API_BASE}/api/v1/products?name=${encodeURIComponent(search)}`, {
            headers: { 'accept': 'application/json', 'cookie': cookieHeader }
        });
        if (prodRes.ok) productResults = await prodRes.json();
    }

    return { 
        details: jobData, 
        searchResults: productResults 
    };
};

export const actions: Actions = {
    // Action to add/save products to a job/installation
    saveProducts: async ({ request, fetch, params }) => {
        const cookieHeader = request.headers.get('cookie') || '';
        const data = await request.formData();
        
        const products = JSON.parse(data.get('products') as string);
        
        const payload = {
            prj_id: params.jbid, // Mapping jbid to prj_id as per your requirements
            products: products
        };

        const response = await fetch(`${API_BASE}/api/v1/product/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cookie': cookieHeader
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return fail(response.status, { message: "Failed to save products" });
        }

        return { success: true, message: "Products updated successfully!" };
    }
};
