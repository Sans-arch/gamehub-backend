import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/UserRepository/types';
import { UserPersistDTO } from '../dtos/UserDTO';

type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
};

export class UserService {
  private jwtSecret = String(process.env.JWT_SECRET);

  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(name: string, email: string, password: string) {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email.match(emailRegex)) {
      throw new Error('Invalid email.');
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error('This email is already taken');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userToBeCreated: UserPersistDTO = {
      name,
      email,
      password: hashedPassword
    };

    const createdUser = await this.userRepository.save(userToBeCreated);

    if (!createdUser) {
      throw new Error('Cannot create user!');
    }

    const accessToken = jwt.sign(
      { id: createdUser.id, email: createdUser.email, name: createdUser.name }, this.jwtSecret, { expiresIn: "1h" }
    );

    return {
      token: accessToken,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email
      }
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found!');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error('Wrong password!');
    }

    const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, this.jwtSecret, { expiresIn: "1h" });

    return {
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  async validateToken(token: string) {
    let user: any;

    jwt.verify(token, this.jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error('Invalid token!')
      }

      user = decoded;
    });

    return user;
  }
}
