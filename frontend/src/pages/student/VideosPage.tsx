import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getVideos } from '../../api/videos.api';
import { Video } from '../../types/video.types';
import VideoCard from '../../components/student/VideoCard';
import VideoPlayer from '../../components/student/VideoPlayer';
import Spinner from '../../components/ui/Spinner';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [playing, setPlaying] = useState<Video | null>(null);

  useEffect(() => {
    getVideos()
      .then((res) => setVideos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const subjects = ['All', ...Array.from(new Set(videos.map((v) => v.subject)))];

  const filtered = videos.filter((v) => {
    const matchSubject = activeSubject === 'All' || v.subject === activeSubject;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description?.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Video Recordings</h1>
        <p className="text-gray-500 text-sm mt-1">Watch recorded lessons at your own pace</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeSubject === s ? 'bg-brand-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center"><Spinner /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">No videos found</p>
          <p className="text-sm mt-1">Try changing your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((video) => (
            <VideoCard key={video._id} video={video} onClick={() => setPlaying(video)} />
          ))}
        </div>
      )}

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}
