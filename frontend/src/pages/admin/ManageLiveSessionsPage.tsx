import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Radio } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { adminGetSessions, createSession, updateSession, deleteSession } from '../../api/liveSessions.api';
import { LiveSession } from '../../types/liveSession.types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { useForm } from 'react-hook-form';

interface SessionForm {
  title: string;
  description: string;
  platform: 'zoom' | 'meet' | 'teams' | 'other';
  joinUrl: string;
  subject: string;
  scheduledAt: string;
  durationMins: number;
  meetingId: string;
  passcode: string;
}

export default function ManageLiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LiveSession | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SessionForm>();

  useEffect(() => {
    adminGetSessions().then((res) => setSessions(res.data)).finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditing(null);
    reset({ platform: 'zoom', durationMins: 60 });
    setModalOpen(true);
  };

  const openEdit = (s: LiveSession) => {
    setEditing(s);
    reset({
      title: s.title, description: s.description, platform: s.platform,
      joinUrl: s.joinUrl, subject: s.subject,
      scheduledAt: format(new Date(s.scheduledAt), "yyyy-MM-dd'T'HH:mm"),
      durationMins: s.durationMins, meetingId: s.meetingId, passcode: s.passcode,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: SessionForm) => {
    setSaving(true);
    try {
      if (editing) {
        const res = await updateSession(editing._id, data);
        setSessions((prev) => prev.map((s) => s._id === editing._id ? res.data : s));
        toast.success('Session updated');
      } else {
        const res = await createSession(data);
        setSessions((prev) => [res.data, ...prev]);
        toast.success('Session created');
      }
      setModalOpen(false);
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this session?')) return;
    try {
      await deleteSession(id);
      setSessions((prev) => prev.filter((s) => s._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed'); }
  };

  const platformColor: Record<string, 'blue' | 'green' | 'purple' | 'yellow'> = {
    zoom: 'blue', meet: 'green', teams: 'purple', other: 'yellow',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Sessions</h1>
          <p className="text-gray-500 text-sm mt-1">{sessions.length} sessions total</p>
        </div>
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Schedule Session</Button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center"><Spinner /></div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16">
          <Radio className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No sessions yet</p>
          <Button onClick={openAdd}><Plus className="h-4 w-4" /> Schedule your first session</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sessions.map((s) => (
            <div key={s._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={platformColor[s.platform] || 'blue'}>{s.platform.toUpperCase()}</Badge>
                <Badge variant={s.isActive ? 'green' : 'red'}>{s.isActive ? 'Active' : 'Inactive'}</Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-brand-600 font-medium mb-2">{s.subject}</p>
              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <div>{format(new Date(s.scheduledAt), 'dd MMM yyyy, hh:mm a')}</div>
                <div>{s.durationMins} minutes</div>
                {s.meetingId && <div>ID: {s.meetingId}</div>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => openEdit(s)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(s._id)}>
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Session' : 'Schedule Session'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Session Title" placeholder="e.g. Algebra Doubt Clearing – Batch A"
            error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Platform</label>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" {...register('platform')}>
                <option value="zoom">Zoom</option>
                <option value="meet">Google Meet</option>
                <option value="teams">Microsoft Teams</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input label="Subject" placeholder="e.g. Mathematics"
              error={errors.subject?.message} {...register('subject', { required: 'Subject is required' })} />
          </div>
          <Input label="Join URL" placeholder="https://zoom.us/j/..."
            error={errors.joinUrl?.message} {...register('joinUrl', { required: 'Join URL is required' })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Scheduled Date & Time" type="datetime-local"
              error={errors.scheduledAt?.message} {...register('scheduledAt', { required: 'Date is required' })} />
            <Input label="Duration (minutes)" type="number" {...register('durationMins')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Meeting ID (optional)" placeholder="123 456 7890" {...register('meetingId')} />
            <Input label="Passcode (optional)" placeholder="abc123" {...register('passcode')} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea rows={2} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none" placeholder="What will be covered..." {...register('description')} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Create Session'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
