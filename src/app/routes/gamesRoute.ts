import { Router } from 'express';
import { getMostPopular, getGame, getGamesById } from '../controllers/gamesController';

const router = Router();

router.get('/most-popular', getMostPopular);
router.get('/get-by-slug', getGame);
router.get('/get-by-id', getGamesById);

export default router;
