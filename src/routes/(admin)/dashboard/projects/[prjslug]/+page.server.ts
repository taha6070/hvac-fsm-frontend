import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/v1/projects/${params.prjslug}?includejobs=true`
  );

  if (!res.ok) {
    throw error(404, 'Project not found');
  }

  const project = await res.json();

  return { project };
};
