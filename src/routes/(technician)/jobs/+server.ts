// src/routes/api/jobs/+server.ts
import { json, error } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$env/static/public";

export const GET = async ({ request, fetch }) => {
  const cookieHeader = request.headers.get("cookie") || "";

  const res = await fetch(`${PUBLIC_API_URL}/jobs`, {
    headers: { cookie: cookieHeader },
  });

  if (!res.ok) {
    throw error(res.status, "Failed to fetch jobs");
  }

  const data = await res.json();
  return json(data);
};