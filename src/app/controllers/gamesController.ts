import { Request, Response } from 'express';
import {
  getAllGamesFromExternalAPI,
  getMostPopularFromLastDecadeFromIGDB,
  getGameInfo,
} from '../services/gamesService';


interface GameQueryParams {
  gameSlug: string;
}

export async function getAllGames(req: Request, res: Response) {
  const games = await getAllGamesFromExternalAPI();

  return res.status(200).json(games);
}

export async function getMostPopular(req: Request, res: Response) {
  const games = await getMostPopularFromLastDecadeFromIGDB();

  return res.type('application/json').status(200).json(games);
}

export async function getGame(req: Request<unknown, unknown, unknown, GameQueryParams>, res: Response) {
  const { gameSlug } = req.query;
  const [game] = await getGameInfo(gameSlug);

  return res.type('application/json').status(200).json(game);
}
