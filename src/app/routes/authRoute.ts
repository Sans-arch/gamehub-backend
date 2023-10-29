import { FastifyReply, FastifyRequest } from 'fastify';

import { server } from '../../index';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';
import { UserService } from '../services/UserService';
import { AuthController } from '../auth/authController';

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

export async function authRoute() {
  server.post('/api/auth/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = await authController.register(request);

    reply.code(code).send(body);
  });

  server.post('/api/auth/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = await authController.login(request);

    reply.code(code).send(body);
  });

  server.post('/api/auth/retrieve', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = await authController.retrieveUserByToken(request);

    reply.code(code).send(body);
  });

  server.post('/api/auth/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = await authController.revogueToken(request);

    reply.code(code).send(body);
  });
}
