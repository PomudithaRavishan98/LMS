import api from './axiosInstance';
import { Video } from '../types/video.types';

export const getVideos = (subject?: string) =>
  api.get<Video[]>('/student/videos', { params: subject ? { subject } : {} });

export const getVideo = (id: string) => api.get<Video>(`/student/videos/${id}`);

// Admin
export const adminGetVideos = () => api.get<Video[]>('/admin/videos');
export const createVideo = (data: Partial<Video>) => api.post<Video>('/admin/videos', data);
export const updateVideo = (id: string, data: Partial<Video>) => api.patch<Video>(`/admin/videos/${id}`, data);
export const deleteVideo = (id: string) => api.delete(`/admin/videos/${id}`);
export const togglePublish = (id: string) => api.patch<Video>(`/admin/videos/${id}/publish`);
