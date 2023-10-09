import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const authMiddleware = {
  preHandler: (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const token = request.headers.authorization?.replace(/^Bearer /, '');

    if (!token) {
      reply.code(401).send({ message: 'Unauthorized: token missing.' });
    }

    const user = userService.verifyToken(token);

    if (!user) {
      reply.code(404).send({ message: 'Unauthorized: invalid token.' });
    }

    done();
  },
};
