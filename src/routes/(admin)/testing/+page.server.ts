import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ fetch, request }) => {
        const cookieHeader = request.headers.get('cookie') || '';

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/me', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'cookie': cookieHeader 
                },
                body: JSON.stringify({})
            });

            // 1. Safely parse JSON
            const data = await response.json().catch(() => ({}));
            console.log("Backend Response:", data);

            // 2. Handle failure based on HTTP status or backend response
            if (!response.ok) {
                return fail(response.status, {
                    success: false,
                    // Use detail if it exists, otherwise provide a fallback
                    message: data.detail || "Invalid session or credentials. Please try again.",
                });
            }

            // 3. Success case
            return {
                success: true,
                message: data.detail || "Request processed successfully!",
                status: response.status,
                user: data // Optionally pass user data back to the UI
            };

        } catch (err) {
            console.error("Fetch Error:", err);
            return fail(500, {
                success: false,
                message: "Authentication server is currently unreachable.",
            });
        }
    }
} satisfies Actions;