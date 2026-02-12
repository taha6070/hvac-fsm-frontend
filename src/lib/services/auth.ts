export async function verifyJWT(token: string) {
  const res = await fetch('http://127.0.0.1:8000/api/v1/auth/verify', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Invalid token');

  return res.json();
}
