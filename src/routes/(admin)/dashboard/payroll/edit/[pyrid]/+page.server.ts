import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch, params, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';

    const res = await fetch(`http://127.0.0.1:8000/api/v1/payrolls/${params.pyrid}`, {
        headers: { 'cookie': cookieHeader }
    });

    if (!res.ok) throw error(404, 'Not Found');

    // Get the raw data
    const data = await res.json();

    // Return the fields directly so they are easy to grab
    return {
        emp_name: data.emp_name,
        emp_id: data.emp_id,
        jobtype_id: data.jobtype_id,
        jobtype_title: data.jobtype_title,
        amount: data.amount,
        deduct_helper: data.deduct_helper
    };
};

export const actions: Actions = {
    updatePayroll: async ({ request, fetch, params }) => {
        const cookieHeader = request.headers.get('cookie') || '';
        const formData = await request.formData();

        const payload = {
            emp_id: Number(formData.get('emp_id')),
            job_type: Number(formData.get('job_type')),
            deduct_helper: formData.get('deduct_helper') === 'true',
            amount: Number(formData.get('amount'))
        };

        await fetch(`http://127.0.0.1:8000/api/v1/payrolls/${params.pyrid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'cookie': cookieHeader
            },
            body: JSON.stringify(payload)
        });

        throw redirect(303, '/dashboard/payroll');
    }
};