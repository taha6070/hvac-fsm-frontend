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

    const title = formData.get('title')?.toString();
    const addresss = formData.get('address')?.toString();

    const status = formData.get('status')?.toString();
    const service_type = formData.get('service_type')?.toString();

    const start_date = formData.get('start_date')?.toString();
    const end_date = formData.get('end_date')?.toString();
    const total_invoice = formData.get('total_invoice')
    const customer_id = formData.get('customer_id')?.toString();

    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({
      title,

      customer_id
    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        title,
        addresss,
        service_type,
        status,
        total_invoice: Number(total_invoice),
        customer_id: Number(customer_id),
        start_date: toISO(start_date),
        end_date: toISO(end_date)
      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch(`${PUBLIC_API_URL}/projects/`, {
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
        message: data.detail || "Project Created successfully!"
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
