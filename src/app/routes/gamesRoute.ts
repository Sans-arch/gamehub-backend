import { Router } from 'express';
import { getMostPopular, getGame, getGamesById, createReview } from '../controllers/gamesController';

const router = Router();

router.get('/most-popular', getMostPopular);
router.get('/get-by-slug', getGame);
router.get('/get-by-id', getGamesById);
router.post('/create-review', createReview);

export default router;
