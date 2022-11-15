import type { Actions } from "./$types";
import { invalid, redirect } from '@sveltejs/kit';
import type { GenericErrorModel, NewUserRequest, UserResponse } from '$lib/generated';
import { api } from "$lib/api";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    if (typeof username !== 'string' || !username) {
      return invalid(400, { username, missing: true });
    }
    if (typeof email !== 'string' || !email) {
      return invalid(400, { email, missing: true });
    }

    if (typeof password !== 'string' || !password) {
      return invalid(400, { password, missing: true });
    }

    try {
      const { data } = await api.post<UserResponse, NewUserRequest>(
        'users',
        { user: { username, email, password } }
      );

      if (data.user) {
        cookies.set('jwt', JSON.stringify(data.user), {
          encode: (value) => Buffer.from(value).toString('base64')
        });
        throw redirect(302, '/');
      }
    } catch (error) {
      if (api.error<GenericErrorModel>(error)) {
        return invalid(400, {
          errors: error.response?.data?.errors,
          username,
          email,
          password
        });
      }
    }
  }
};