import { useEffect, useState } from 'react';
import { getSessions } from '../../api/liveSessions.api';
import { LiveSession } from '../../types/liveSession.types';
import LiveSessionCard from '../../components/student/LiveSessionCard';
import Spinner from '../../components/ui/Spinner';
import { Radio } from 'lucide-react';

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions()
      .then((res) => setSessions(res.data))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = sessions.filter((s) => new Date(s.scheduledAt) > new Date());
  const past = sessions.filter((s) => new Date(s.scheduledAt) <= new Date());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Sessions</h1>
        <p className="text-gray-500 text-sm mt-1">Join live interactive classes and doubt-clearing sessions</p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center"><Spinner /></div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16">
          <Radio className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No sessions scheduled yet</p>
          <p className="text-gray-400 text-sm mt-1">Check back soon for upcoming sessions</p>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcoming.map((s) => <LiveSessionCard key={s._id} session={s} />)}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-gray-400">Past Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {past.map((s) => <LiveSessionCard key={s._id} session={s} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
