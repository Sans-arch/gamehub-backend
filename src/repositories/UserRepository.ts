import { User } from '../models/userModel';

const users: User[] = [];

export class UserRepository {
  findByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  save(user: User) {
    users.push(user);
  }
}
