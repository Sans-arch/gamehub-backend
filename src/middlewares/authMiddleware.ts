import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export const authMiddleware = {
  preHandler: (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const token = request.headers.authorization?.replace(/^Bearer /, '');

    if (!token) {
      reply.code(401).send({ message: 'Unauthorized: token missing.' });
    }

    const user = authService.verifyToken(token);

    if (!user) {
      reply.code(404).send({ message: 'Unauthorized: invalid token.' });
    }

    done();
  },
};
