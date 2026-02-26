import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ fetch, request }) => {
    const formData = await request.formData();

    const emp_id = formData.get('employee_id')?.toString();
    const job_type = formData.get('jobtype_id')?.toString();
    const amount = formData.get('amount')?.toString();



    // ✅ Log incoming form data (this logs in your server terminal)
    console.log("Incoming Form Data:");
    console.log({
        emp_id,
        job_type,
        amount,

    });

    const cookieHeader = request.headers.get('cookie') || '';

    try {
      const payload = {
        emp_id:Number(emp_id),
        job_type:Number(job_type),
        amount:Number(amount),
        deduct_helper: true,

      };

      // ✅ Log payload before sending to backend
      console.log("Sending to Backend:", payload);

      const response = await fetch(`http://127.0.0.1:8000/api/v1/payrolls`, {
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
