import { User } from '../models/userModel';

interface IUserDTOConstructor {
  token: string;
  user: User;
}

export class UserDTO {
  id?: string;
  name: string;
  email: string;
  token: string;

  constructor({ token, user }: IUserDTOConstructor) {
    const { id, name, email } = user;

    this.name = name;
    this.email = email;
    this.token = token;
  }
}