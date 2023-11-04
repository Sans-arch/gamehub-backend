import { Request, Response } from 'express';
import { getAllListsFromUser, createList } from '../services/listsService';

interface CreateUserListRequestBody {
  userEmail: string;
  description: string;
  selectedGamesIds: string[];
}

async function getUserLists(req: Request, res: Response) {
  const lists = await getAllListsFromUser();

  return res.status(200).json(lists);
}

async function createUserList(req: Request, res: Response) {
  const { userEmail, description, selectedGamesIds } = req.body as CreateUserListRequestBody;

  const createdList = await createList({ userEmail, description, selectedGamesIds });

  return res.status(201).send(createdList);
}

export { getUserLists, createUserList };
