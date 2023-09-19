import * as dotenv from 'dotenv';
import Fastify, { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { UserRepository } from './auth/UserRepository';
import { AuthService } from './auth/AuthService';
import { AuthController } from './auth/AuthController';

dotenv.config();

const app = Fastify({ logger: true });

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authMiddleware = {
  preHandler: (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const token = request.headers.authorization?.replace(/^Bearer /, '');

    if (!token) {
      reply.code(401).send({ message: 'Unauthorized: token missing.' });
    }

    const user = authService.verifyToken(token);

    if (!user) {
      reply.code(404).send({ message: 'Unauthorized: invalid token.' });
    }

    request.user = user;

    done();
  }
};

app.get('/api/games', authMiddleware, (request, reply) => {
  reply
    .type('application/json')
    .code(200)
    .send(
      [
        { id: 1, name: "Batman Arkham City" },
        { id: 2, name: "Batman Arkham Asylum" },
        { id: 3, name: "Batman Arkham Knight" },
      ]
    );
});

app.post("/api/auth/register", (request, reply) => {
  const { code, body } = authController.register(request);

  reply.code(code).send(body);
});

app.post("/api/auth/login", (request, reply) => {
  const { code, body } = authController.login(request);

  reply.code(code).send(body);
});

app.listen({
  port: Number(process.env.APP_PORT) || 5765
}, (err) => {
  if (err) {
    throw err;
  }
});
