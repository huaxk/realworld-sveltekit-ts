import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const jwt = event.cookies.get('jwt', {
    decode: (value) => Buffer.from(value, 'base64').toString('utf-8')
  });
  event.locals.user = jwt ? JSON.parse(jwt) : null;
  return await resolve(event);
};