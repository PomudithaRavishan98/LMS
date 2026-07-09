import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Radio, BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getVideos } from '../../api/videos.api';
import { getSessions } from '../../api/liveSessions.api';
import { Video as VideoType } from '../../types/video.types';
import { LiveSession } from '../../types/liveSession.types';
import LiveSessionCard from '../../components/student/LiveSessionCard';
import Spinner from '../../components/ui/Spinner';
import { format } from 'date-fns';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getVideos(), getSessions()])
      .then(([v, s]) => {
        setVideos(v.data);
        setSessions(s.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const upcoming = sessions.filter((s) => new Date(s.scheduledAt) > new Date()).slice(0, 3);

  if (loading) return <div className="flex h-64 items-center justify-center"><Spinner /></div>;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-hero-gradient rounded-3xl p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-white/70">Continue your learning journey today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Videos', value: videos.length, icon: Video, color: 'bg-blue-50 text-blue-600' },
          { label: 'Upcoming Sessions', value: upcoming.length, icon: Radio, color: 'bg-purple-50 text-purple-600' },
          { label: 'Subjects', value: [...new Set(videos.map((v) => v.subject))].length, icon: BookOpen, color: 'bg-green-50 text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      {upcoming.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-600" /> Upcoming Sessions
            </h2>
            <Link to="/dashboard/live" className="text-sm text-brand-600 hover:text-brand-700 font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((s) => <LiveSessionCard key={s._id} session={s} />)}
          </div>
        </div>
      )}

      {/* Recent Videos */}
      {videos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Video className="h-5 w-5 text-brand-600" /> Recent Videos
            </h2>
            <Link to="/dashboard/videos" className="text-sm text-brand-600 hover:text-brand-700 font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.slice(0, 4).map((v) => (
              <Link key={v._id} to="/dashboard/videos" className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Video className="h-5 w-5 text-brand-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{v.title}</div>
                  <div className="text-xs text-gray-500">{v.subject} • {v.viewCount} views</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
