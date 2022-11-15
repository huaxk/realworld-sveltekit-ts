import { RestClient } from "typed-rest-client";
// import type { User, NewUser, UserResponse, LoginUser } from "./generated";

const baseUrl = 'https://api.realworld.io/api';
const rest = new RestClient('rest-realworld', baseUrl);

const auth = (token: string | undefined) => token ? { additionalHeaders: { Authorization: token } } : undefined;

// export const api = {
//   users: {
//     create: async (user: NewUser) => await rest.create<UserResponse>('users', { user }),
//     login: async (user: LoginUser) => await rest.create<UserResponse>('users/login', { user }),
//     current: async (token: string) => await rest.get<UserResponse>('users', auth(token)),
//     update: async (user: User, token: string) => await rest.replace('users', user, auth(token)),
//   }
// };

export const api = {
  get: async <R>(path: string, token?: string) => rest.get<R>(path, auth(token)),
  del: async <R>(path: string, token?: string) => rest.del<R>(path, auth(token)),
  post: async <P, R>(path: string, data: P, token?: string) => rest.create<R>(path, data, auth(token)),
  put: async <P, R>(path: string, data: P, token?: string) => rest.replace<R>(path, data, auth(token)),
};
