import { format, isPast, isToday } from 'date-fns';
import { Calendar, Clock, ExternalLink, Video } from 'lucide-react';
import { LiveSession } from '../../types/liveSession.types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const platformColors: Record<string, 'blue' | 'green' | 'purple'> = {
  zoom: 'blue',
  meet: 'green',
  teams: 'purple',
};

export default function LiveSessionCard({ session }: { session: LiveSession }) {
  const date = new Date(session.scheduledAt);
  const past = isPast(date);
  const today = isToday(date);

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 ${past ? 'opacity-60' : 'border-gray-100 hover:shadow-md transition-shadow'}`}>
      <div className="flex items-start justify-between mb-3">
        <Badge variant={platformColors[session.platform] || 'blue'}>
          {session.platform.toUpperCase()}
        </Badge>
        {today && !past && (
          <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Today
          </span>
        )}
        {past && <span className="text-xs text-gray-400">Ended</span>}
      </div>

      <h3 className="font-semibold text-gray-900 text-lg mb-1">{session.title}</h3>
      <p className="text-sm text-brand-600 font-medium mb-3">{session.subject}</p>
      {session.description && <p className="text-sm text-gray-500 mb-4">{session.description}</p>}

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{format(date, 'dd MMM yyyy')}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{format(date, 'hh:mm a')}</span>
        <span className="flex items-center gap-1.5"><Video className="h-4 w-4" />{session.durationMins} mins</span>
      </div>

      {session.meetingId && (
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 mb-4 space-y-1">
          <div><span className="font-medium">Meeting ID:</span> {session.meetingId}</div>
          {session.passcode && <div><span className="font-medium">Passcode:</span> {session.passcode}</div>}
        </div>
      )}

      {!past && (
        <a href={session.joinUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full" size="sm">
            <ExternalLink className="h-4 w-4" />
            Join Session
          </Button>
        </a>
      )}
    </div>
  );
}
