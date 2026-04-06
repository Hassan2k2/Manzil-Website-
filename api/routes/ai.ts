import { Router } from 'express';
import { getRecommendations } from '../controllers/ai.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/recommend', requireAuth, getRecommendations);

export default router;
