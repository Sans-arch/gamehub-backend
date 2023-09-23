import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllGamesFromExternalAPI, getAllGamesFromMock } from '../services/gamesService';

export async function getAllGames(request: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromExternalAPI();

  return reply.code(200).send(games);
}

export async function getFakeGames(request: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromMock();

  return reply.type('application/json').code(200).send(games);
}
