import { Router } from 'express';
import { addUser, getUser } from '../controllers/user';

const router = Router();

router.post('/user/save', addUser);
router.get('/user/:id', getUser);

export default router;