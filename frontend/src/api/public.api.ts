import api from './axiosInstance';

export interface TeacherProfile {
  name: string;
  title: string;
  bio: string;
  email: string;
  subjects: string[];
  experience: string;
  students: string;
  rating: string;
  socialLinks: { youtube: string; linkedin: string; instagram: string };
}

export const getProfile = () => api.get<TeacherProfile>('/public/profile');
export const getTestimonials = () => api.get('/public/testimonials');
export const sendContact = (data: { name: string; email: string; message: string }) =>
  api.post('/public/contact', data);
