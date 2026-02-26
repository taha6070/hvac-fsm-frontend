// src/routes/jobs/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params,fetch }) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/helper/jobs?page=1&limit=10&prj_id=${params.prjslug}`,
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