import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import StudentDashboard from '../pages/student/StudentDashboard';
import VideosPage from '../pages/student/VideosPage';
import LiveSessionsPage from '../pages/student/LiveSessionsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageStudentsPage from '../pages/admin/ManageStudentsPage';
import ManageVideosPage from '../pages/admin/ManageVideosPage';
import ManageLiveSessionsPage from '../pages/admin/ManageLiveSessionsPage';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout role="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/dashboard/videos" element={<VideosPage />} />
            <Route path="/dashboard/live" element={<LiveSessionsPage />} />
          </Route>
        </Route>

        {/* Admin Dashboard */}
        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout role="teacher" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<ManageStudentsPage />} />
            <Route path="/admin/videos" element={<ManageVideosPage />} />
            <Route path="/admin/live-sessions" element={<ManageLiveSessionsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
