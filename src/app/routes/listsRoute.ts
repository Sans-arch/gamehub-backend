import { Router } from 'express';
import { createUserList, getUserLists } from '../controllers/listsController';
import { AuthMiddlewares } from './middlewares/authMiddleware';

const router = Router();

router.get('/', AuthMiddlewares, getUserLists);
router.post('/', AuthMiddlewares, createUserList);

export default router;
