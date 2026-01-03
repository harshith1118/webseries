import express from 'express';
import { uploadVideo, getVideos, getVideo } from '../controllers/videoController';
import { protect } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = express.Router();

router.route('/')
    .get(getVideos)
    .post(protect, upload.single('video'), uploadVideo);

router.route('/:id')
    .get(getVideo);

export default router;
