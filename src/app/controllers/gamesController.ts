import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllGamesFromExternalAPI,
  getMostPopularFromLastDecadeFromIGDB,
  getGameInfo,
} from '../services/gamesService';

interface GetGameQueryProps {
  gameSlug: string;
}

export async function getAllGames(request: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromExternalAPI();

  return reply.code(200).send(games);
}

export async function getMostPopular(request: FastifyRequest, reply: FastifyReply) {
  const games = await getMostPopularFromLastDecadeFromIGDB();

  return reply.type('application/json').code(200).send(games);
}

export async function getGame(request: FastifyRequest, reply: FastifyReply) {
  const { gameSlug } = request.query as GetGameQueryProps;
  const [game] = await getGameInfo(gameSlug);

  return reply.type('application/json').code(200).send(game);
}
