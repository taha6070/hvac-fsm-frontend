import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { getFormData } from "$lib/server/event.js";
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
  default: async () => {
    const { email, password } = await getFormData("email", "password");

    if (!email || !password) {
      return fail(400, {
        success: false,
        message:
          "Please enter an email, and password confirmation to create an account",
      });
    }
try {
      // 2. External API Call
      const res = await fetch(`${PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          password: password,
          role: "admin"
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // 3. Check for API Failure
      if (!res.ok) {
        // Optional: Get error message from your FastAPI backend
        const errorData = await res.json().catch(() => ({}));
        return fail(res.status, {
          success: false,
          message: errorData.detail || "Registration failed on the server.",
        });
      }

      // 4. Success Case
      return { 
        success: true, 
        message: "Your account has been created!" 
      };

    } catch (err) {
      // 5. Handle Network/Connection Errors
      return fail(500, {
        message: "Could not connect to the authentication server.",
      });
    }
  },
} satisfies Actions;
