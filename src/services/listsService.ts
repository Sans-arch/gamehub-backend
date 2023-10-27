import { ListRepository } from '../repositories/ListRepository';
import { UserRepository } from '../repositories/UserRepository';

interface CreateListProps {
  userEmail: string;
  description: string;
  selectedGamesIds: string[];
}

interface CreatedListDTO {
  id: number;
  description: string;
  gameList: any[];
}

const userRepository = new UserRepository();
const listRepository = new ListRepository();

export async function getAllListsFromUser() {
  return [];
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

  return {
    id: createdCustomList.id,
    description: createdCustomList.description,
    gameList: createdCustomList.gamelist.map(game => {
      return {
        id: game.gameid,
      }
    })
  }
}
