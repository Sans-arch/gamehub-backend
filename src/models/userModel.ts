import { v4 as uuidv4 } from 'uuid';

interface IUserConstructor {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor({ id, name, email, password, createdAt }: IUserConstructor) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt ?? new Date();
  }
}

