import axios, { AxiosError, type AxiosResponse } from "axios";

const baseURL = 'https://api.realworld.io/api';
const client = axios.create({
  baseURL,
  timeout: 15000,
});

const authHeader = (token: string | undefined) => token ? { Authorization: `Token ${token} `} : {};

export const api = {
  get: async<T>(path: string, token?: string) => client.get<T>(path, { headers: authHeader(token) }),
  del: async<T>(path: string, token?: string) => client.delete<T>(path, { headers: authHeader(token) }),
  post: async<T, D>(path: string, data?: D, token?: string) =>
    client.post<T, AxiosResponse<T, D>, D>(path, data, { headers: authHeader(token) }),
  put: async<T, D>(path: string, data: D, token?: string) =>
    client.put<T, AxiosResponse<T, D>, D>(path, data, { headers: authHeader(token) }),
  // handle errors return from api
  error: <T>(error: unknown): error is AxiosError<T> => axios.isAxiosError<T>(error),
};
