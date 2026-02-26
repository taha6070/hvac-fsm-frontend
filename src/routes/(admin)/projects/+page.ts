import type { PageLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: PageLoad = async ({ fetch, url }) => {
  const page = Number(url.searchParams.get('page') ?? 1);
  const limit = Number(url.searchParams.get('limit') ?? 20);
  const title = url.searchParams.get('title');
  const start_date=url.searchParams.get('start_date');
  const end_date=url.searchParams.get("end_date");

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit)

  });

  if (title) {
    query.append('title', title);
  }
  if (start_date){
    query.append('start_date',start_date);
  }
  if (end_date){
    query.append("end_date",end_date);
  }

  const res = await fetch(
    `${API_URL}/projects?${query.toString()}`
  );

  if (!res.ok) throw new Error('Failed to fetch projects');

  const data = await res.json();

  return {
    jobs: data.items ?? data,
    total: data.total ?? 0,
    page,
    limit,
    title
  };
};
