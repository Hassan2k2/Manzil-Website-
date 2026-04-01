import { Router } from 'express';
import { getProfile, joinSchool } from '../controllers/profile';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getProfile);
router.post('/join-school', requireAuth, joinSchool);

export default router;
