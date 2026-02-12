import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ fetch, request }) => {
        const formData = await request.formData();
        
        // Extract all fields from the form
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');

        const cookieHeader = request.headers.get('cookie') || '';

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/contacts/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'cookie': cookieHeader 
                },
                // Send all fields to your backend
                body: JSON.stringify({ 
                    email, 
                    password, 
                    name, 
                    phone, 
                    address 
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                return fail(response.status, {
                    success: false,
                    message: data.detail || "Registration failed. Please check your details.",
                });
            }

            return {
                success: true,
                message: data.detail||"Contact Created successfully!",
            };

        } catch (err) {
            return fail(500, {
                success: false,
                message: "Backend server is unreachable.",
            });
        }
    }
} satisfies Actions;