export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  uploader: {
    _id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface HistoryItem {
  video: Video;
  progress: number;
  lastWatched: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}
