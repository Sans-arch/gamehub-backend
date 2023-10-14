import { FastifyReply, FastifyRequest } from 'fastify';

import { server } from '../index';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { AuthController } from '../auth/AuthController';

const userRepository = new UserRepository();
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
}
