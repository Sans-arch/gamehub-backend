import { Router } from 'express';
import gamesController from '../controllers/gamesController';

const router = Router();

router.get('/', gamesController.getAllGames);

export default router;
