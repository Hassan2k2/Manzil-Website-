import { Router } from 'express';
import { getProfile, joinSchool } from '../controllers/profile.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, getProfile);
router.post('/join-school', requireAuth, joinSchool);

export default router;
