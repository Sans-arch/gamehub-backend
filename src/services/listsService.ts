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

export async function createList({ userEmail, description, selectedGamesIds }: CreateListProps): Promise<any> {
  const user = await userRepository.findByEmail(userEmail);

  const createdCustomList = await listRepository.save({
    description: description,
    userId: user?.id as number,
    selectedGamesIds: selectedGamesIds,
  });

  return createdCustomList;
}
