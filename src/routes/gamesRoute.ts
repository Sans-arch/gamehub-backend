import { server } from '../index';
import { getMostPopular } from '../controllers/gamesController';

export async function gamesRoute() {
  server.get('/api/games/most-popular', getMostPopular);
}
