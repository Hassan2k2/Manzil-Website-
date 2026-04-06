import { Router } from 'express';
import { saveProgress, getProgress } from '../controllers/assessment';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/progress', requireAuth, saveProgress);
router.get('/progress', requireAuth, getProgress);

export default router;
