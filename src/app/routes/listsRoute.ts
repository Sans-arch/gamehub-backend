import { Router } from 'express';
import { createUserList, getUserLists } from '../controllers/listsController';
import { AuthMiddlewares } from './middlewares/authMiddleware';

const router = Router();

router.get('/', AuthMiddlewares, getUserLists);
router.post('/', createUserList);

export default router;
