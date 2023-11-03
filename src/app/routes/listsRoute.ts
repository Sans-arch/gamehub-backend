import { Router } from 'express';
import { createUserList, getUserLists } from '../controllers/listsController';

const router = Router();

router.get('/api/lists/getAll', getUserLists);
router.post('/api/lists', createUserList);

export default router;
