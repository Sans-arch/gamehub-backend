import { FastifyInstance } from 'fastify';
import gamesController from '../controllers/gamesController';
// import { authMiddleware } from '../middlewares/authMiddleware';

export async function gamesRoute(server: FastifyInstance) {
  // server.get('/api/games', authMiddleware, (request, reply) => {
  server.get('/api/games', (request, reply) => {
    reply
      .type('application/json')
      .code(200)
      .send([
        { id: 1, name: 'Batman Arkham City' },
        { id: 2, name: 'Batman Arkham Asylum' },
        { id: 3, name: 'Batman Arkham Knight' },
      ]);
  });


  server.get('/api/gamesalt', gamesController.getAllGames);
}
