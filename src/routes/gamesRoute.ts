import { server } from '../index';
import { getFakeGames, getMostPopular } from '../controllers/gamesController';

export async function gamesRoute() {
  server.get('/api/games/featured', getFakeGames);
  server.get('/api/games/most-popular', getMostPopular);
}
