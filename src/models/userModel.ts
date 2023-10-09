interface IUserConstructor {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;

  constructor({ id, name, email, password, createdAt }: IUserConstructor) {
    if (id) {
      this.id = id;
    }

    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt ?? new Date();
  }
}
