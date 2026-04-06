import { Router } from 'express';
import { getDashboardStats } from '../controllers/school';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/dashboard', requireAuth, getDashboardStats);

export default router;
