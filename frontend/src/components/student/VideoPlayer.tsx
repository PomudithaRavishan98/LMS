import Modal from '../ui/Modal';
import { Video } from '../../types/video.types';

function getEmbedUrl(url: string, provider: string): string {
  if (provider === 'youtube' || url.includes('youtube') || url.includes('youtu.be')) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    if (url.includes('/embed/')) return url;
  }
  if (provider === 'vimeo' || url.includes('vimeo')) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    if (url.includes('player.vimeo.com')) return url;
  }
  return url;
}

interface Props {
  video: Video | null;
  onClose: () => void;
}

export default function VideoPlayer({ video, onClose }: Props) {
  if (!video) return null;
  const embedUrl = getEmbedUrl(video.embedUrl, video.provider);

  return (
    <Modal open={!!video} onClose={onClose} title={video.title} size="lg">
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      {video.description && (
        <p className="mt-4 text-sm text-gray-600">{video.description}</p>
      )}
    </Modal>
  );
}
