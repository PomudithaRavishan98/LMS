import api from './axiosInstance';
import { LiveSession } from '../types/liveSession.types';

export const getSessions = () => api.get<LiveSession[]>('/student/live-sessions');
export const getSession = (id: string) => api.get<LiveSession>(`/student/live-sessions/${id}`);

// Admin
export const adminGetSessions = () => api.get<LiveSession[]>('/admin/live-sessions');
export const createSession = (data: Partial<LiveSession>) => api.post<LiveSession>('/admin/live-sessions', data);
export const updateSession = (id: string, data: Partial<LiveSession>) =>
  api.patch<LiveSession>(`/admin/live-sessions/${id}`, data);
export const deleteSession = (id: string) => api.delete(`/admin/live-sessions/${id}`);
