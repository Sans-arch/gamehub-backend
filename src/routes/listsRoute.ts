import { createUserList, getUserLists } from '../controllers/listsController';
import { server } from '../index';

export async function gamesRoute() {
  server.get('/api/lists/getAll', getUserLists);

  server.post('/api/lists', createUserList);
}
