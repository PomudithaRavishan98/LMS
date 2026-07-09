import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap, LayoutDashboard, Video, Radio, Users, LogOut, Menu, X, Settings,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const studentNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Video Recordings', icon: Video, to: '/dashboard/videos' },
  { label: 'Live Sessions', icon: Radio, to: '/dashboard/live' },
];

const teacherNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'Students', icon: Users, to: '/admin/students' },
  { label: 'Videos', icon: Video, to: '/admin/videos' },
  { label: 'Live Sessions', icon: Radio, to: '/admin/live-sessions' },
];

export default function DashboardLayout({ role }: { role: 'student' | 'teacher' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = role === 'teacher' ? teacherNav : studentNav;

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-brand-900 text-white">
      <div className="flex h-16 items-center gap-2 px-4 border-b border-white/10">
        <GraduationCap className="h-6 w-6 text-accent-400" />
        <span className="font-bold text-lg">EduMentor</span>
        {role === 'teacher' && <span className="ml-auto text-xs bg-accent-500 px-2 py-0.5 rounded-full">Admin</span>}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard' || item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-600 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 lg:hidden shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-semibold text-gray-900">EduMentor</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
