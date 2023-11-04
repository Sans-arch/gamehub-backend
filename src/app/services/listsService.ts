import { PrismaListRepository } from '../repositories/ListRepository/ListRepository';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';
import { ListRepository } from '../repositories/ListRepository/types';
import { UserRepository } from '../repositories/UserRepository/types';

interface CreateListProps {
  userEmail: string;
  description: string;
  selectedGamesIds: string[];
}

interface CreatedListDTO {
  id: number;
  description: string;
  gameList: {
    id: number;
  }[];
}

const listRepository: ListRepository = new PrismaListRepository();
const userRepository: UserRepository = new PrismaUserRepository();

export async function getAllListsFromUser(userId: string) {
  const lists = await listRepository.findByUserId(Number(userId));
  return lists;
}

export async function createList({ userEmail, description, selectedGamesIds }: CreateListProps): Promise<CreatedListDTO> {
  const user = await userRepository.findByEmail(userEmail);

  const existingList = await listRepository.findByDescription(description);

  if (existingList) {
    throw new Error('This description was already used by another list. Please, try another one');
  }

  const createdCustomList = await listRepository.save({
    description: description,
    userId: user?.id as number,
    selectedGamesIds: selectedGamesIds,
  });

  if (!createdCustomList) {
    throw new Error('Cannot create List!');
  }

  if (!createdCustomList.gameList) {
    throw new Error('Empty game list!');
  }

  return {
    id: createdCustomList?.id,
    description: createdCustomList.description,
    gameList: createdCustomList.gameList.map(game => {
      return {
        id: game.gameId
      }
    })
  }
}
