// +page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('http://127.0.0.1:8000/api/v1/job-type?page=1&limit=20');

  if (!res.ok) {
    throw error(res.status, 'Failed to fetch jobs');
  }

  const jobtype = await res.json();

  return {
    jobtype
  };
};