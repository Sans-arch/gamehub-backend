import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import userService from '../../services/userService';

export const authMiddleware = {
  preHandler: (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    if (request.method == 'OPTIONS') {
      done();
    } else {
      const token = request.headers.authorization?.replace(/^Bearer /, '') || '';

      if (!token) {
        reply.code(401).send({ message: 'Unauthorized: token missing.' });
      }

      if (!userService.validateToken(token)) {
        reply.code(404).send({ message: 'Unauthorized: invalid token.' });
      }

      done();
    }
  },
};
