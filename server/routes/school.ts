import { Router } from 'express';
import { getDashboardStats, getStudentDetails } from '../controllers/school.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireAuth, getDashboardStats);
router.get('/students/:id', requireAuth, getStudentDetails);

export default router;
