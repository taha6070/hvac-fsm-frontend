import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { getFormData } from "$lib/server/event.js";

export const actions = {
  default: async () => {
    const { email, password,phone,role, name } = await getFormData("email", 
        "password",
        "phone",
        "role",
        "name"
    );

    if (!email || !password) {
      return fail(400, {
        success: false,
        message:
          "Please enter an email, and password confirmation to create an account",
      });
    }
try {
      // 2. External API Call
      const res = await fetch('http://127.0.0.1:8000/api/v1/employees', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          role: role,
          phone_no:phone,
          name:name
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
