import * as dotenv from 'dotenv';
import fastify from 'fastify';
import { UserRepository } from './repositories/UserRepository';
import { AuthService } from './services/AuthService';
import { AuthController } from './auth/AuthController';
import { gamesRoute } from './routes/gamesRoute';

dotenv.config();

const server = fastify({
  logger: true,
});

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

server.register(gamesRoute);

server.post('/api/auth/register', (request, reply) => {
  const { code, body } = authController.register(request);

  reply.code(code).send(body);
});

server.post('/api/auth/login', (request, reply) => {
  const { code, body } = authController.login(request);

  reply.code(code).send(body);
});

server.listen({
  port: Number(process.env.APP_PORT) || 5765,
},
  (err) => {
    if (err) throw err;
  },
);
