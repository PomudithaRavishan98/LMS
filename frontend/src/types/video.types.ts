export interface Video {
  _id: string;
  title: string;
  description: string;
  embedUrl: string;
  provider: 'youtube' | 'vimeo' | 'other';
  subject: string;
  tags: string[];
  isPublished: boolean;
  thumbnailUrl: string;
  duration: string;
  viewCount: number;
  createdAt: string;
}
