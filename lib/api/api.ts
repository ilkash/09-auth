import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;
export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
