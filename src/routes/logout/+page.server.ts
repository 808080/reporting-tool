import { redirect } from '@sveltejs/kit'
import type { Actions } from '../$types';
import { USER_STORAGE_NAME } from '../../utils/userStore'

export const load = () => {
  throw redirect(302, '/')
};

export const actions: Actions = {
  default({ cookies }) {
    cookies.set(USER_STORAGE_NAME, '', {
      path: '/',
      expires: new Date(0),
    });

    throw redirect(302, '/signin');
  },
}