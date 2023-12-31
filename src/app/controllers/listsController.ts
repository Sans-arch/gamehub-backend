import { Request, Response } from 'express';
import { ListService } from '../services/listsService';
import { PrismaListRepository } from '../repositories/ListRepository/ListRepository';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';

export interface RequestCustom extends Request {
  userId?: string;
}

interface CreateUserListRequestBody {
  userEmail: string;
  description: string;
  selectedGamesIds: string[];
}

const listRepository = new PrismaListRepository();
const userRepository = new PrismaUserRepository();
const listsService = new ListService(listRepository, userRepository);

async function getUserLists(req: RequestCustom, res: Response) {
  if (req.userId) {
    const lists = await listsService.getAllListsFromUser(req.userId);
    return res.status(200).json(lists);
  }

  return res.status(400).json({
    message: 'User not found!',
  })
}

async function createUserList(req: Request, res: Response) {
  const { userEmail, description, selectedGamesIds } = req.body as CreateUserListRequestBody;

  const createdList = await listsService.createList({ userEmail, description, selectedGamesIds });

  return res.status(201).send(createdList);
}

async function deleteUserList(req: Request, res: Response) {
  const { id } = req.params;

  const deletedList = await listsService.deleteList(Number(id));

  if (!deletedList) {
    return res.status(400).json({
      error: 'Não foi possível deletar a lista!',
    })
  }

  return res.status(200).json(deletedList);
}

export default { getUserLists, createUserList, deleteUserList };
