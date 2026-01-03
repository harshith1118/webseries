import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // URL to master.m3u8
  duration: number; // in seconds
  views: number;
  uploader: mongoose.Types.ObjectId;
  createdAt: Date;
}

const VideoSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  thumbnailUrl: {
    type: String,
    default: 'no-photo.jpg',
  },
  videoUrl: {
    type: String,
  },
  duration: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IVideo>('Video', VideoSchema);
