// src/routes/api/jobs/+server.ts
import { json, error } from "@sveltejs/kit";

export const GET = async ({ request, fetch }) => {
  const cookieHeader = request.headers.get("cookie") || "";

  const res = await fetch("http://127.0.0.1:8000/api/v1/jobs", {
    headers: { cookie: cookieHeader },
  });

  if (!res.ok) {
    throw error(res.status, "Failed to fetch jobs");
  }

  const data = await res.json();
  return json(data);
};