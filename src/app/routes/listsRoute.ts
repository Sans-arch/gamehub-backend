import { Router } from 'express';
import { AuthMiddlewares } from './middlewares/authMiddleware';
import listsController from '../controllers/listsController';

const router = Router();

router.get('/', AuthMiddlewares, listsController.getUserLists);
router.post('/', AuthMiddlewares, listsController.createUserList);
router.delete('/:id', AuthMiddlewares, listsController.deleteUserList);

export default router;
