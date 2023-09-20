import { User } from '../models/userModel';

export class UserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  save(user: User) {
    this.users.push(user);
  }
}
