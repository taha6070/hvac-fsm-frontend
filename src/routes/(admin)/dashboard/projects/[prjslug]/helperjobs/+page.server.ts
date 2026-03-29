// src/routes/jobs/+page.server.ts
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
export const load: PageServerLoad = async ({ params, fetch }) => {
  const response = await fetch(
    `${PUBLIC_API_URL}/helper/jobs?page=1&limit=10&prj_id=${params.prjslug}`,
    {
      headers: {
        accept: 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const data = await response.json();

  return {
    jobs: data.results,
    total: data.total
  };
};