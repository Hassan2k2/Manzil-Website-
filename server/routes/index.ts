import { Router } from 'express';
import authRouter from './auth.js';
import assessmentRouter from './assessment.js';
import universityRouter from './university.js';
import aiRouter from './ai.js';
import profileRouter from './profile.js';
import schoolRouter from './school.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/assessment', assessmentRouter);
router.use('/university', universityRouter);
router.use('/ai', aiRouter);
router.use('/profile', profileRouter);
router.use('/schools', schoolRouter);

router.get('/', (req, res) => {
  res.json({ message: 'API connected' });
});

export default router;
