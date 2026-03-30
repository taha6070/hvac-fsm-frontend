import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";


function toISO(date: string) {
  if (!date) return null;
  return new Date(date).toISOString();
}


export const actions = {
  default: async ({ fetch, request }) => {
    const formData = await request.formData();

    // const addresss = formData.get('address')?.toString();
    const addresss = null;

    const status = formData.get('status')?.toString();
    const project_id = formData.get("project_id")?.toString();

    const start_date = formData.get('start_date')?.toString();
    const end_date = formData.get('end_date')?.toString();
    const assigned_to = formData.get('employee_id')?.toString();
    const job_type = formData.get("jobtype_id")?.toString();

    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({

      assigned_to
    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        project_id: Number(project_id),
        addresss,
        status,
        assigned_to: Number(assigned_to),
        start_date: toISO(start_date),
        end_date: toISO(end_date),
        job_type: Number(job_type)
      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch(`${PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          cookie: cookieHeader
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      // ✅ Log backend response
      console.log("Backend Response:", data);

      if (!response.ok) {
        console.error("Backend Error:", data);

        return fail(response.status, {
          success: false,
          message: data.detail || "Registration failed. Please check your details."
        });
      }

      return {
        success: true,
        message: data.detail || `Job   assigned  to  successfully!`
      };

    } catch (err) {
      console.error("Server Error:", err);

      return fail(500, {
        success: false,
        message: "Backend server is unreachable."
      });
    }
  }
} satisfies Actions;
