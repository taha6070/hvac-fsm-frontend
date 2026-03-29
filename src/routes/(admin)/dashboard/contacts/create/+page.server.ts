import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { API_URL } from "$env/static/private";
import { PUBLIC_API_URL } from "$env/static/public";

export const actions = {
  default: async ({ fetch, request }) => {
    const formData = await request.formData();

    const email = formData.get('email')?.toString();
    const ghl_id = formData.get('ghl_id')?.toString();

    const name = formData.get('name')?.toString();
    const phone = formData.get('phone_no')?.toString();
    const address = formData.get('address')?.toString();

    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({
      email,
      name,
      phone,
      address
    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        ghl_id,
        email,
        name,
        phone,
        address
      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch(`${PUBLIC_API_URL}/contacts/`, {
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
        message: data.detail || "Contact Created successfully!"
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
