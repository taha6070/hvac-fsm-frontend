import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ cookies }) => {
	// Delete the access_token cookie
	cookies.delete('access_token', {
		path: '/'
	});

	// Redirect to login page
	throw redirect(302, '/auth/signin');
};