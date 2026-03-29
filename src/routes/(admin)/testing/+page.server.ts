import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";


export const actions = {
    default: async ({ fetch, request }) => {
        const cookieHeader = request.headers.get('cookie') || '';

        try {
            const response = await fetch(`${PUBLIC_API_URL}/me`, {
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
                message: data.role || "Request processed successfully!",
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