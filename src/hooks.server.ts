import type { Handle } from '@sveltejs/kit';
import { USER_STORAGE_NAME } from './utils/userStore';

export const handle: Handle = async ({ event, resolve }) => {
  const username = event.cookies.get(USER_STORAGE_NAME)

  if (!username) {
    return await resolve(event);
  }

  event.locals.user = username;

  return await resolve(event)
}
