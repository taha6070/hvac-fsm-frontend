import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params, fetch, request }) => {
    const { empid } = params;

    // Pass cookies forward for authentication if needed
    const cookieHeader = request.headers.get('cookie');
    const headers = {
        'accept': 'application/json',
        ...(cookieHeader ? { 'Cookie': cookieHeader } : {})
    };

    try {
        const [employeeRes, teamsRes] = await Promise.all([
            fetch(`${PUBLIC_API_URL}/employees/${empid}`, { headers }),
            fetch(`${PUBLIC_API_URL}/team/`, { headers })
        ]);

        if (!employeeRes.ok) {
            throw error(employeeRes.status, 'Employee not found');
        }

        const employee = await employeeRes.json();
        const teams = teamsRes.ok ? await teamsRes.json() : [];

        return {
            employee,
            teams
        };
    } catch (e) {
        console.error('Error fetching employee data:', e);
        throw error(500, 'Could not load profile data');
    }
};

export const actions = {
    updateEmployee: async ({ request, params, fetch }) => {
        const { empid } = params;
        const data = await request.formData();

        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();
        const phone_no = data.get('phone_no')?.toString();
        const role = data.get('role')?.toString();
        const team_id_str = data.get('team_id')?.toString();
        const position = data.get('position')?.toString();
        const password = data.get('password')?.toString();

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone_no) updateData.phone_no = phone_no;
        if (role) updateData.role = role;

        if (team_id_str) {
            updateData.team_id = parseInt(team_id_str, 10);
            if (isNaN(updateData.team_id)) updateData.team_id = null;
        } else {
            updateData.team_id = null; // if empty string or not provided
        }

        if (position) {
            updateData.detail = { position };
        }

        if (password) {
            updateData.password = password;
        }

        const cookieHeader = request.headers.get('cookie');

        try {
            const response = await fetch(`${PUBLIC_API_URL}/employees/${empid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    ...(cookieHeader ? { 'Cookie': cookieHeader } : {})
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                let errorMessage = 'Failed to update employee';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.message || errorData.error || errorMessage;
                    if (typeof errorMessage !== 'string') errorMessage = JSON.stringify(errorMessage);
                } catch (e) { }

                return fail(response.status, { error: errorMessage, success: false });
            }

            return { success: true, message: 'Employee updated successfully' };
        } catch (err) {
            console.error('Error updating employee:', err);
            return fail(500, { error: 'Internal server error while updating employee', success: false });
        }
    }
} satisfies Actions;
