import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllListsFromUser, createList } from '../services/listsService';

interface CreateUserListRequestBody {
  description: string;
}

async function getUserLists(request: FastifyRequest, reply: FastifyReply) {
  const lists = await getAllListsFromUser();

  return reply.code(200).send(lists);
}

async function createUserList(request: FastifyRequest, reply: FastifyReply) {
  const { description } = request.body as CreateUserListRequestBody;

  const createdList = await createList({ description });

  return reply.code(201).send(createdList);
}

export { getUserLists, createUserList };