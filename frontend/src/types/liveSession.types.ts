export interface LiveSession {
  _id: string;
  title: string;
  description: string;
  platform: 'zoom' | 'meet' | 'teams' | 'other';
  joinUrl: string;
  subject: string;
  scheduledAt: string;
  durationMins: number;
  isActive: boolean;
  meetingId: string;
  passcode: string;
  createdAt: string;
}
