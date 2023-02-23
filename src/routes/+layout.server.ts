import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { USER_STORAGE_NAME } from "../utils/userStore";


export const load = ({ cookies, url }: ServerLoadEvent) => {
  const localUser = cookies.get(USER_STORAGE_NAME);

  if (url.pathname !== '/signin' && !localUser) {
    throw redirect(307, '/signin');
  }
};