import { Router } from 'express';
import { getDashboardStats } from '../controllers/school.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireAuth, getDashboardStats);

export default router;
