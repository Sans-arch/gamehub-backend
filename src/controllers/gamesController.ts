import { Request, Response } from 'express';
import { Game } from '../models/game';

const games: Game[] = [];

export const createGame = (req: Request, res: Response) => {
  const { title, platform, genre } = req.body;
  const newGame: Game = { id: games.length + 1, title, platform, genre };
  games.push(newGame);
  res.status(201).json(newGame);
};

export const getGames = (req: Request, res: Response) => {
  res.json(games);
};

export const getGameById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const game = games.find((g) => g.id === id);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  res.json(game);
};

export const updateGame = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const game = games.find((g) => g.id === id);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  const { title, platform, genre } = req.body;
  game.title = title;
  game.platform = platform;
  game.genre = genre;
  res.json(game);
};

export const deleteGame = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const gameIndex = games.findIndex((g) => g.id === id);
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' });
  }
  games.splice(gameIndex, 1);
  res.status(204).send();
};
