import { server } from '../index';
import { getFakeGames } from '../controllers/gamesController';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function gamesRoute() {
  server.get('/api/games', {
    preHandler: authMiddleware.preHandler,
  }, getFakeGames);
}
