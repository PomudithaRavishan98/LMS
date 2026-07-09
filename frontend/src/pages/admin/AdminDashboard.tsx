import { useEffect, useState } from 'react';
import { Users, Video, Radio, UserCheck, TrendingUp } from 'lucide-react';
import api from '../../api/axiosInstance';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';

interface Stats {
  totalStudents: number;
  pendingStudents: number;
  totalVideos: number;
  upcomingSessions: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Stats>('/admin/stats')
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600', change: '' },
        { label: 'Pending Approval', value: stats.pendingStudents, icon: UserCheck, color: 'bg-amber-50 text-amber-600', change: '' },
        { label: 'Published Videos', value: stats.totalVideos, icon: Video, color: 'bg-green-50 text-green-600', change: '' },
        { label: 'Upcoming Sessions', value: stats.upcomingSessions, icon: Radio, color: 'bg-purple-50 text-purple-600', change: '' },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div className="bg-hero-gradient rounded-3xl p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-white/70">Welcome back, {user?.name}. Here's your platform overview.</p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-brand-600" />
          <h2 className="font-bold text-gray-900">Quick Guide</h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>→ Go to <strong>Students</strong> to approve or manage student accounts</li>
          <li>→ Go to <strong>Videos</strong> to add YouTube/Vimeo links for recorded sessions</li>
          <li>→ Go to <strong>Live Sessions</strong> to schedule upcoming Zoom/Meet sessions</li>
          <li>→ Students must be approved before they can log in and access content</li>
        </ul>
      </div>
    </div>
  );
}
