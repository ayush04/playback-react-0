import { Router } from 'express';
import { alive, getSuggestions } from '../controllers/search';
import { createTest } from '../controllers/test';

const router = Router();

router.get('/alive', alive);
router.get('/search/:query', getSuggestions);

router.post('/create/:value', createTest);

export default router;