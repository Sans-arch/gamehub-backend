
import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllGamesFromExternalAPI } from '../services/gamesService';

export async function getAllGames(request: FastifyRequest, reply: FastifyReply) {
  const games = await getAllGamesFromExternalAPI();

  return reply.code(200).send(games);
}

export async function getFakeGames(request: FastifyRequest, reply: FastifyReply) {
  return reply.type('application/json').code(200).send([
    { id: 1, name: 'Batman Arkham City' },
    { id: 2, name: 'Batman Arkham Asylum' },
    { id: 3, name: 'Batman Arkham Knight' },
  ]);
}
