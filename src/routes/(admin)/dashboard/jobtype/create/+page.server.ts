import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ fetch, request }) => {
    const formData = await request.formData();

    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();


    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({
      title,
      description,

    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        title,
        description,
      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch('http://127.0.0.1:8000/api/v1/job-type', {
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
        message: data.detail || "Job Type Created successfully!"
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
