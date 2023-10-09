import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllGamesFromExternalAPI, getMostPopularFromLastDecadeFromIGDB } from '../services/gamesService';

export async function getAllGames(request: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromExternalAPI();

  return reply.code(200).send(games);
}

export async function getMostPopular(request: FastifyRequest, reply: FastifyReply) {
  const games = await getMostPopularFromLastDecadeFromIGDB();

  return reply.type('application/json').code(200).send(games);
}
