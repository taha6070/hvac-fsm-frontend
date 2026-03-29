import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";

export const actions = {
  default: async ({ fetch, request }) => {
    const formData = await request.formData();

    const emp_id = formData.get('employee_id')?.toString();
    const job_type = formData.get('jobtype_id')?.toString();
    const amount = formData.get('amount')?.toString();
    const helper_deduction = formData.get('helper_deduction');
    const commission = formData.get('commission');

    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({
      emp_id,
      job_type,
      amount,
      helper_deduction,
      commission
    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        emp_id: Number(emp_id),
        job_type: Number(job_type),
        amount: Number(amount),
        deduct_helper: helper_deduction,
        commission: commission
      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch(`${PUBLIC_API_URL}/payrolls`, {
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
        message: data.detail || " Payroll Rule Created successfully!"
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
