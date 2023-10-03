import { FastifyReply, FastifyRequest } from 'fastify';
import { server } from '../index';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from '../services/authService';
import { AuthController } from '../auth/authController';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export async function authRoute() {
  server.post('/api/auth/register', (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = authController.register(request);

    reply.code(code).send(body);
  });

  server.post('/api/auth/login', (request: FastifyRequest, reply: FastifyReply) => {
    const { code, body } = authController.login(request);

    reply.code(code).send(body);
  });
}
