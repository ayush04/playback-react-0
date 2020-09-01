import { Router } from 'express';
import { getAPIKey, getClientId } from '../controllers/secret';

const router = Router();

router.get('/id', getClientId);
router.get('/key', getAPIKey);

export default router;