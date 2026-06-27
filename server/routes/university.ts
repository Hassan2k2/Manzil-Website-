import { Router } from 'express';
import { getAllUniversities, getUniversityById, createUniversity, saveUniversityMatches, getPakistanPrograms, getUkPrograms } from '../controllers/university.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All university data endpoints require auth so the tier check can run
router.get('/', requireAuth, getAllUniversities);
router.get('/pakistan-programs', requireAuth, getPakistanPrograms);
router.get('/uk-programs', requireAuth, getUkPrograms);
router.get('/:id', requireAuth, getUniversityById);
router.post('/', requireAuth, createUniversity);
router.post('/save-matches', requireAuth, saveUniversityMatches);

export default router;
