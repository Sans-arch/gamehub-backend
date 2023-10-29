interface IUserDTOConstructor {
  token?: string;
  user: {
    id?: string | number;
    name: string;
    email: string;
    password?: string;
  };
}

export class UserDTO {
  token?: string;
  user: {
    id?: string;
    name: string;
    email: string;
  };

  constructor({ token, user }: IUserDTOConstructor) {
    const { name, email } = user;

    if (token) {
      this.token = token;
    }

    this.user = {
      email: email,
      name: name,
    };
  }
}
