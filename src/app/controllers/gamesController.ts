import { Request, Response } from 'express';
import gamesService from '../services/gamesService';

export async function getMostPopular(req: Request, res: Response) {
  const games = await gamesService.getMostPopularFromLastDecadeFromIGDB();

  return res.type('application/json').status(200).json(games);
}

export async function getGame(req: Request<unknown, unknown, unknown, { gameSlug: string }>, res: Response) {
  const { gameSlug } = req.query;
  const [game] = await gamesService.getGameInfo(gameSlug);

  return res.type('application/json').status(200).json(game);
}

export async function getGamesById(req: Request<unknown, unknown, unknown, { ids: string[] }>, res: Response) {
  const { ids } = req.query;
  const games = await gamesService.getGamesById(ids);

  return res.type('application/json').status(200).json(games);
}
