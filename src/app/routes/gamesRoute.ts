import { server } from '../../index';
import { getMostPopular, getGame } from '../controllers/gamesController';

export async function gamesRoute() {
  server.get('/api/games/most-popular', getMostPopular);

  server.get('/api/games/get-by-slug', getGame);
}
