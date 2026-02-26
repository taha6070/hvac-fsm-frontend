import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('access_token', { path: '/' });
	return new Response(null, { status: 204 });
};