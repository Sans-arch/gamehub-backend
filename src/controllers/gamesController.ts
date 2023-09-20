
import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllGamesFromExternalAPI } from '../services/gamesService';

async function getAllGames(req: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromExternalAPI();

  return reply.code(200).send(games);
}

export default { getAllGames };
