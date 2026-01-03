import express from 'express';
import { updateHistory, getHistory } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/history')
    .get(protect, getHistory)
    .post(protect, updateHistory);

export default router;
