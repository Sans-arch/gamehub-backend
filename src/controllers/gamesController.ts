import Express from 'express';

import { getAllGamesFromExternalAPI } from '../services/gamesService';

async function getAllGames(req: Express.Request, res: Express.Response) {
  const games = await getAllGamesFromExternalAPI();

  return res.json(games);
}

export default { getAllGames };
