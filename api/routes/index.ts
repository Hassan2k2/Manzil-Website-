import { Router } from 'express';
import authRouter from './auth';
import assessmentRouter from './assessment';
import universityRouter from './university';
import aiRouter from './ai';
import profileRouter from './profile';
import schoolRouter from './school';

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
