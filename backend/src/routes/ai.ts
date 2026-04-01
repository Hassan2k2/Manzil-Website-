import { Router } from 'express';
import { getRecommendations } from '../controllers/ai';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/recommend', requireAuth, getRecommendations);

export default router;
