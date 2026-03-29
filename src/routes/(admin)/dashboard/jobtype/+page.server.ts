// +page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_API_URL}/job-type?page=1&limit=20`);

  if (!res.ok) {
    throw error(res.status, 'Failed to fetch jobs');
  }

  const jobtype = await res.json();

  return {
    jobtype
  };
};