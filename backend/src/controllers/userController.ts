import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import User from '../models/User';

// @desc    Update watch history / progress
// @route   POST /api/users/history
// @access  Private
export const updateHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { videoId, progress } = req.body;
    
    if (!videoId) {
        res.status(400).json({ success: false, message: 'Video ID is required' });
        return;
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }

    // Check if video already in history
    const historyIndex = user.history.findIndex(item => item.video.toString() === videoId);

    if (historyIndex > -1) {
        // Update existing
        user.history[historyIndex].progress = progress || 0;
        user.history[historyIndex].lastWatched = new Date();
    } else {
        // Add new
        user.history.push({
            video: videoId,
            progress: progress || 0,
            lastWatched: new Date()
        });
    }

    await user.save();

    res.status(200).json({ success: true, data: user.history });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get watch history
// @route   GET /api/users/history
// @access  Private
export const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).populate({
        path: 'history.video',
        select: 'title description thumbnailUrl duration'
    });

    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }

    // Sort by lastWatched desc
    const history = user.history.sort((a, b) => b.lastWatched.getTime() - a.lastWatched.getTime());

    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
