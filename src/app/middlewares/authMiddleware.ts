import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository/types';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';

const userRepository: UserRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

export const authMiddleware = {
  preHandler: (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const token = request.headers.authorization?.replace(/^Bearer /, '');

    if (!token) {
      reply.code(401).send({ message: 'Unauthorized: token missing.' });
    }

    if (!userService.verifyToken(token as string)) {
      reply.code(404).send({ message: 'Unauthorized: invalid token.' });
    }

    done();
  },
};
