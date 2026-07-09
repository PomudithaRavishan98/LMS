import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminGetVideos, createVideo, updateVideo, deleteVideo, togglePublish } from '../../api/videos.api';
import { Video as VideoType } from '../../types/video.types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { useForm } from 'react-hook-form';

interface VideoForm {
  title: string;
  description: string;
  embedUrl: string;
  provider: 'youtube' | 'vimeo' | 'other';
  subject: string;
  duration: string;
  thumbnailUrl: string;
}

export default function ManageVideosPage() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<VideoType | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VideoForm>();

  useEffect(() => {
    adminGetVideos().then((res) => setVideos(res.data)).finally(() => setLoading(false));
  }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (v: VideoType) => {
    setEditing(v);
    reset({ title: v.title, description: v.description, embedUrl: v.embedUrl, provider: v.provider, subject: v.subject, duration: v.duration, thumbnailUrl: v.thumbnailUrl });
    setModalOpen(true);
  };

  const onSubmit = async (data: VideoForm) => {
    setSaving(true);
    try {
      if (editing) {
        const res = await updateVideo(editing._id, data);
        setVideos((prev) => prev.map((v) => v._id === editing._id ? res.data : v));
        toast.success('Video updated');
      } else {
        const res = await createVideo(data);
        setVideos((prev) => [res.data, ...prev]);
        toast.success('Video added');
      }
      setModalOpen(false);
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    try {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed'); }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await togglePublish(id);
      setVideos((prev) => prev.map((v) => v._id === id ? res.data : v));
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Videos</h1>
          <p className="text-gray-500 text-sm mt-1">{videos.length} videos total</p>
        </div>
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Video</Button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center"><Spinner /></div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16">
          <Video className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No videos yet</p>
          <Button onClick={openAdd}><Plus className="h-4 w-4" /> Add your first video</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <div key={v._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-brand-100 to-brand-200 h-32 flex items-center justify-center">
                <Video className="h-10 w-10 text-brand-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="blue">{v.subject}</Badge>
                  <Badge variant={v.isPublished ? 'green' : 'yellow'}>{v.isPublished ? 'Published' : 'Draft'}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{v.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{v.viewCount} views • {v.duration || 'No duration'}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleToggle(v._id)}>
                    {v.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {v.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => openEdit(v)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(v._id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Video' : 'Add Video'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" placeholder="e.g. Quadratic Equations – Part 1" error={errors.title?.message}
            {...register('title', { required: 'Title is required' })} />
          <Input label="YouTube / Vimeo URL" placeholder="https://youtu.be/..." error={errors.embedUrl?.message}
            {...register('embedUrl', { required: 'URL is required' })} />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Provider</label>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" {...register('provider')}>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input label="Subject" placeholder="e.g. Mathematics" {...register('subject', { required: 'Subject is required' })} error={errors.subject?.message} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Duration (display)" placeholder="e.g. 45:00" {...register('duration')} />
            <Input label="Thumbnail URL (optional)" placeholder="https://..." {...register('thumbnailUrl')} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea rows={3} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none" placeholder="Brief description..." {...register('description')} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Add Video'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
