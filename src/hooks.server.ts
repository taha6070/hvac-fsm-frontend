import { jwtVerify } from 'jose';
import type { Handle } from '@sveltejs/kit';

const SECRET = new TextEncoder().encode('efac76425e2a8b8fb2ed81c6ca019978a84b9e971670e0f6ba28805d04109b32');

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('access_token');

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      event.locals.user = payload;
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
