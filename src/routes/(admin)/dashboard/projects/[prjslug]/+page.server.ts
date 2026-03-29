import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const prjSlug = params.prjslug;

  // Run both fetches concurrently for better performance
  const [projRes, techRes] = await Promise.all([
    fetch(`${PUBLIC_API_URL}/projects/${prjSlug}?includejobs=true`),
    fetch(`${PUBLIC_API_URL}/helper/jobs?page=1&limit=20&prj_id=${prjSlug}`)
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