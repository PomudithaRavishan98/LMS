export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatarUrl?: string;
  isApproved?: boolean;
  phone?: string;
  enrolledSubjects?: string[];
  createdAt?: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
