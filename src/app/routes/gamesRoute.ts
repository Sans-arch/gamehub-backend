import { Router } from 'express';
import { getMostPopular, getGame } from '../controllers/gamesController';

const router = Router();

router.get('/most-popular', getMostPopular);
router.get('/get-by-slug', getGame);

export default router;
