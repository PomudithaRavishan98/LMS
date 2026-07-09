import api from './axiosInstance';
import { AuthResponse, User } from '../types/user.types';

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password });

export const register = (data: { name: string; email: string; password: string; phone?: string }) =>
  api.post('/auth/register', data);

export const getMe = () => api.get<User>('/auth/me');
