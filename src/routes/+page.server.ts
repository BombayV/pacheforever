import type { Actions } from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import { ACCESS_CODE } from '$env/static/private';
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const code = cookies.get('pc:code');
  if (!code || code !== ACCESS_CODE) {
    return {
      url: url.origin
    }
  }

  return redirect(302, '/start');
}

export const actions: Actions = {
  exchangeCode: async ({ cookies, request }) => {
    const data = await request.formData();
    const code = data.get('code') as string;
    console.log('code', ACCESS_CODE, code)
    if (code !== ACCESS_CODE) {
      return fail(401, {
        message: 'Codigo incorrecto'
      });
    }

    cookies.set('pc:code', code, {
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return redirect(302, '/start')
  }
}