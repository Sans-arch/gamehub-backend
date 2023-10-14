import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllListsFromUser } from '../services/listsService';

async function getUserLists(request: FastifyRequest, reply: FastifyReply) {
  const lists = await getAllListsFromUser();

  return reply.code(200).send(lists);
}

async function createUserList(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.body);

  return reply.code(200).send('a');
}

export { getUserLists, createUserList };
