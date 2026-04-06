import { Router } from 'express';
import { getAllUniversities, getUniversityById, createUniversity, saveUniversityMatches, getPakistanPrograms } from '../controllers/university.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllUniversities);
router.get('/pakistan-programs', getPakistanPrograms);
router.get('/:id', getUniversityById);
router.post('/', requireAuth, createUniversity);
router.post('/save-matches', requireAuth, saveUniversityMatches);

export default router;
