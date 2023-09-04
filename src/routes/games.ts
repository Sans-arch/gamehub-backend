import express from 'express';
import { createGame, getGames, getGameById, updateGame, deleteGame } from '../controllers/gamesController';

const router = express.Router();

router.post('/', createGame);
router.get('/', getGames);
router.get('/:id', getGameById);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;
