import { server } from '../index';
import { getFakeGames } from '../controllers/gamesController';

export async function gamesRoute() {
  server.get('/api/games/featured', getFakeGames);
}
