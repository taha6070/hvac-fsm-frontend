import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const prjSlug = params.prjslug;

  // Run both fetches concurrently for better performance
  const [projRes, techRes] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/v1/projects/${prjSlug}?includejobs=true`),
    fetch(`http://127.0.0.1:8000/api/v1/helper/jobs?page=1&limit=20&prj_id=${prjSlug}`)
  ]);

  if (!projRes.ok) throw error(404, 'Project not found');
  if (!techRes.ok) throw error(500, 'Failed to fetch technician jobs');

  const project = await projRes.json();
  const techData = await techRes.json();

  return {
    project,
    technicianJobs: techData.results || [],
    totalTechJobs: techData.total || 0
  };
};