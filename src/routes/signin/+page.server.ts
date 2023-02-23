import { fail, redirect, type ServerLoadEvent } from '@sveltejs/kit'
import { USER_STORAGE_NAME } from '../../utils/userStore'
import type { Action, Actions } from './$types'


export const load = ({ cookies }: ServerLoadEvent) => {
  const localUser = cookies.get(USER_STORAGE_NAME);
  if (localUser) {
    throw redirect(303, '/');
  }
};

const signin: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get('username');

  if (typeof username !== 'string' || !username) {
    return fail(400, { invalid: true });
  }

  cookies.set(USER_STORAGE_NAME, username, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });
};

export const actions: Actions = { signin };