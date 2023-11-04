import { Request, Response } from 'express';
import { getAllListsFromUser, createList } from '../services/listsService';

export interface RequestCustom extends Request {
  userId?: string;
}

interface CreateUserListRequestBody {
  userEmail: string;
  description: string;
  selectedGamesIds: string[];
}

async function getUserLists(req: RequestCustom, res: Response) {
  if (req.userId) {
    const lists = await getAllListsFromUser(req.userId);
    return res.status(200).json(lists);
  }

  return res.status(400).json({
    message: 'User not found!',
  })
}

async function createUserList(req: Request, res: Response) {
  const { userEmail, description, selectedGamesIds } = req.body as CreateUserListRequestBody;

  const createdList = await createList({ userEmail, description, selectedGamesIds });

  return res.status(201).send(createdList);
}

export { getUserLists, createUserList };
