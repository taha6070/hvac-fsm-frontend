import { error } from '@sveltejs/kit';
import type  { PageServerLoad } from '../$types';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

export const load: PageServerLoad = async ({ fetch, url, request }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    
    // 1. Get query params from URL
    const employeeSearch = url.searchParams.get('search') || '';
    const selectedEmpId = url.searchParams.get('emp_id') || '';
    const startDate = url.searchParams.get('start_date') || '';
    const endDate = url.searchParams.get('end_date') || '';

    let employees = [];
    let weeklyPayData = null;

    // 2. Fetch Employee List (if searching)
    if (employeeSearch) {
        const empRes = await fetch(`${API_BASE}/employees?name=${encodeURIComponent(employeeSearch)}`, {
            headers: { 'cookie': cookieHeader }
        });
        if (empRes.ok) employees = await empRes.json();
    }

    // 3. Fetch Weekly Pays (if an employee and dates are selected)
    if (selectedEmpId && startDate && endDate) {
        const payRes = await fetch(
            `${API_BASE}/pays/employee/${selectedEmpId}/weekly-pays?start_date=${startDate}&end_date=${endDate}`,
            { headers: { 'cookie': cookieHeader } }
        );
        if (payRes.ok) weeklyPayData = await payRes.json();
    }

    return {
        employees,
        weeklyPayData,
        params: { selectedEmpId, startDate, endDate, employeeSearch }
    };
};