import type { PageServerLoad } from "./../$types";
import {redirect} from "@sveltejs/kit";
import { ACCESS_CODE } from "$env/static/private";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const code = cookies.get('pc:code');
  if (!code || code !== ACCESS_CODE) {
    return redirect(302, '/');
  }

  return {
    url: url.origin + url.pathname
  }
}