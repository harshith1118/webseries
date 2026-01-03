import api from './api';
import { Video } from '../types';

export const videoService = {
  getAllVideos: async (): Promise<Video[]> => {
    const response = await api.get('/videos');
    return response.data.data;
  },

  getVideoById: async (id: string): Promise<Video> => {
    const response = await api.get(`/videos/${id}`);
    return response.data.data;
  },

  uploadVideo: async (formData: FormData): Promise<Video> => {
    const response = await api.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};
