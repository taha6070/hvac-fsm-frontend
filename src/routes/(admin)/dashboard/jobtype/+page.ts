import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('http://127.0.0.1:8000/api/v1/job-type?page=1&limit=20');

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const jobtype = await res.json();

  return {
    jobtype
  };
};
