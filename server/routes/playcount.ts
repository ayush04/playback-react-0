import { Router } from 'express';
import { updatePlayCount, getTopNPlays } from '../controllers/playcount';

const router = Router();

router.post('/playcount/:id', updatePlayCount);
router.get('/playcount/:n', getTopNPlays);

export default router;