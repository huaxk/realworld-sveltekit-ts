import { api } from '$lib/api';
import type { GenericErrorModel, LoginUserRequest, UserResponse } from '$lib/generated';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (typeof email !== 'string' || !email) {
      return invalid(400, { email, missing: true });
    }

    if (typeof password !== 'string' || !password) {
      return invalid(400, { password, missing: true });
    }

    try {
      const { data } = await api.post<UserResponse, LoginUserRequest>(
        'users/login',
        { user: { email, password } }
      );
      if (data.user) {
        cookies.set('jwt', JSON.stringify(data.user), {
          encode: (value) => Buffer.from(value).toString('base64'),
          secure: true,
        });
        throw redirect(302, '/');
        // return {
        //   status: 302,
        //   headers: { Location: '/' }
        // }
        // return {
        //   status: 302,
        //   redirect: '/'
        // };
      }
    } catch (error) {
      if (api.error<GenericErrorModel>(error)) {
        return invalid(400, {
          errors: error.response?.data.errors,
          email,
          password
        });
      }
    }
  }
};