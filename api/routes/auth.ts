import { Router } from 'express';
import { register, login, googleLogin, getMe } from '../controllers/auth';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', requireAuth, getMe);

export default router;
