import { User } from "@/types/user";
import { nextServer } from "@/lib/api/api";
import axios from "axios";
import { NewNote, Note } from "@/types/note";
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchNotes = async (
  page: number,
  mySearchNote: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params: {
      page,
      search: mySearchNote,
      tag,
    },
  });
  return response.data;
};

export const deleteNote = async (noteID: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteID}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const fetchNoteById = async (noteID: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${noteID}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", {
    username: payload.username,
  });
  return res.data;
};
