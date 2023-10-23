import { ListRepository } from '../repositories/ListRepository';
import { UserRepository } from '../repositories/UserRepository';

interface CreateListProps {
  userEmail: string;
  description: string;
  selectedGamesIds: number[];
}

const userRepository = new UserRepository();
const listRepository = new ListRepository();

export async function getAllListsFromUser() {
  return [];
}

export async function createList({ userEmail, description, selectedGamesIds }: CreateListProps): Promise<
  {
    games: {
      id: number;
      id_igdb: string;
    }[];
  } & {
    id: number;
    description: string;
    user_id: number;
    added_date: Date;
  }
> {
  const user = await userRepository.findByEmail(userEmail);

  const createdCustomList = await listRepository.save({
    description: description,
    userId: user?.id as number,
    selectedGamesIds: selectedGamesIds,
  });

  return createdCustomList;
}
