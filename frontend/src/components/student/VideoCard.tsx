import { Eye, Clock, Play } from 'lucide-react';
import { Video } from '../../types/video.types';
import Badge from '../ui/Badge';

interface Props {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative bg-gradient-to-br from-brand-100 to-brand-200 h-44 flex items-center justify-center">
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-brand-300">
            <Play className="h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg">
            <Play className="h-5 w-5 text-brand-600 fill-brand-600" />
          </div>
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </div>
        )}
      </div>

      <div className="p-4">
        <Badge variant="blue">{video.subject}</Badge>
        <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2">{video.title}</h3>
        {video.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{video.viewCount} views</span>
          {video.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{video.duration}</span>}
        </div>
      </div>
    </div>
  );
}
