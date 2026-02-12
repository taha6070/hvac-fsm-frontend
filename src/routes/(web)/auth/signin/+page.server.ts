import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    // 1. Basic Validation
    if (!email || !password) {
      return fail(400, {
        success: false,
        message: "Please enter both email and password.",
      });
    }

    try {
      // 2. FastAPI Authentication Call
      const res = await fetch('http://127.0.0.1:8000/api/v1/login', {
        method: 'POST',
        // FastAPI OAuth2 usually expects Form Data, but if your 
        // endpoint expects JSON, keep it as JSON.stringify
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // 3. Handle Failed Login
      if (!res.ok) {
        return fail(401, {
          success: false,
          message: "Invalid email or password. Please try again.",
        });
      }

      // 4. Handle Successful Login
      const responseData = await res.json();
      const token = responseData.token; 

      // 5. Set the Cookie (The "Standard" Security Practice)
      cookies.set('access_token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });

    } catch (err) {
      return fail(500, {
        success: false,
        message: "Authentication server is currently unreachable.",
      });
    }

    // 6. Redirect on Success
    // We redirect to the dashboard after a successful login
    throw redirect(303, '/dashboard');
  },
} satisfies Actions;