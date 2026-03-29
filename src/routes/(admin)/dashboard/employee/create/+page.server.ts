import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { getFormData } from "$lib/server/event.js";
import { PUBLIC_API_URL } from "$env/static/public";

export const actions = {
  default: async ({ request, fetch }) => {
    const { email, password, phone, role, name } =
      await getFormData("email", "password", "phone", "role", "name");

    if (!email || !password) {
      return fail(400, {
        success: false,
        message:
          "Please enter an email and password confirmation to create an account",
      });
    }

    try {
      //  Get cookies from incoming request
      const cookie = request.headers.get("cookie");

      const res = await fetch(`${PUBLIC_API_URL}/employees`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role,
          phone_no: phone,
          name
        }),
        headers: {
          "Content-Type": "application/json",
          // ✅ Forward ALL cookies
          cookie: cookie ?? ""
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return fail(res.status, {
          success: false,
          message: errorData.detail || "Registration failed on the server.",
        });
      }

      return {
        success: true,
        message: "Your account has been created!",
      };

    } catch (err) {
      return fail(500, {
        message: "Could not connect to the authentication server.",
      });
    }
  },
} satisfies Actions;