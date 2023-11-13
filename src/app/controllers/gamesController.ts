import { Request, Response } from 'express';
import gamesService from '../services/gamesService';
import { CreateReviewInput } from '../repositories/ReviewRepository/types';

export async function getMostPopular(req: Request, res: Response) {
  const games = await gamesService.getMostPopularFromLastDecadeFromIGDB();

  return res.type('application/json').status(200).json(games);
}

export async function getGame(req: Request<unknown, unknown, unknown, { gameSlug: string }>, res: Response) {
  const { gameSlug } = req.query;
  const game = await gamesService.getGameInfo(gameSlug);

  return res.type('application/json').status(200).json(game);
}

export async function getGamesById(req: Request<unknown, unknown, unknown, { ids: string[] }>, res: Response) {
  const { ids } = req.query;
  const games = await gamesService.getGamesById(ids);

  return res.type('application/json').status(200).json(games);
}

export async function createReview(req: Request, res: Response) {
  const { gameId, userId, rating, description } = req.body as CreateReviewInput;

  if (!gameId || !userId || !rating || !description) return res.status(400).json({ message: 'Information is missing.' });

  const review = await gamesService.createGameReview({ gameId, userId, rating, description });

  if (!review) {
    return res.status(400).json({ message: 'Error creating review' });
  }

  return res.type('application/json').status(200).json(review);
}
