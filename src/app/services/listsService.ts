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

export class ListService {
  constructor(private listRepository: ListRepository, private userRepository: UserRepository) {
    this.listRepository = listRepository;
    this.userRepository = userRepository;
  }

  async getAllListsFromUser(userId: string) {
    const lists = await this.listRepository.findByUserId(Number(userId));
    return lists;
  }

  async createList({ userEmail, description, selectedGamesIds }: CreateListProps): Promise<CreatedListDTO> {
    const user = await this.userRepository.findByEmail(userEmail);

    const existingList = await this.listRepository.findByDescription(description);

    if (existingList) {
      throw new Error('This description was already used by another list. Please, try another one');
    }

    const createdCustomList = await this.listRepository.save({
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

  async deleteList(id: number) {
    if (!id) {
      throw new Error('Id is required!');
    }

    try {
      const deletedList = await this.listRepository.deleteById(id);
      return deletedList;
    } catch (error) {
      return null;
    }
  }
}
