import { Request, Response } from 'express';
import Video from '../models/Video';
import { AuthRequest } from '../middlewares/authMiddleware';
import { processVideo } from '../services/ffmpeg.service';
import fs from 'fs';

// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private
export const uploadVideo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please upload a video file' });
      return;
    }

    const { title, description } = req.body;

    const video = await Video.create({
      title,
      description,
      uploader: req.user?._id,
    });

    // Process video (Convert to HLS)
    try {
        const { videoUrl, thumbnailUrl } = await processVideo(req.file.path, video._id.toString());
        
        video.videoUrl = videoUrl;
        video.thumbnailUrl = thumbnailUrl;
        // video.duration // We could extract duration from ffmpeg metadata too
        await video.save();

        // Remove the original uploaded file to save space
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(201).json({
            success: true,
            data: video,
        });
    } catch (processingError) {
        console.error('Video processing failed:', processingError);
        // Clean up video record if processing fails? Or keep as failed?
        await Video.findByIdAndDelete(video._id);
        res.status(500).json({ success: false, message: 'Video processing failed' });
    }

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videos = await Video.find().populate('uploader', 'username avatar');
    res.status(200).json({ success: true, count: videos.length, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const video = await Video.findById(req.params.id).populate('uploader', 'username avatar');

    if (!video) {
      res.status(404).json({ success: false, message: 'Video not found' });
      return;
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.status(200).json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
