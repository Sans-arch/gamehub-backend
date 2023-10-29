import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/userModel';
import { UserRepository } from '../repositories/UserRepository';
import { UserDTO } from '../dtos/UserDTO';

interface DecodedToken {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const userTokens: any = {};

export class UserService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async register(name: string, email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (user) {
      throw new Error('This email was already used by another user.');
    }

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await this.repository.save(newUser);

    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmailAndPassword(email, password);

    if (!user) {
      throw new Error('User not found!');
    }

    const generatedToken = generateToken({ id: user.id, name: user.name, email: user.email });

    userTokens[user.email] = generatedToken;

    return new UserDTO({
      token: generatedToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }

  async retrieveUserByToken(token: string) {
    const decodedToken = (await this.verifyToken(token)) as DecodedToken;

    return new UserDTO({
      user: {
        name: decodedToken.name,
        email: decodedToken.email,
      },
    });
  }

  async verifyToken(token: any) {
    const jwtSecret = String(process.env.JWT_SECRET);

    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      return decodedToken;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async revogueToken(token: string): Promise<boolean> {
    const { email } = jwt.decode(token) as DecodedToken;

    if (userTokens[email] && userTokens[email] === token) {
      delete userTokens[email];

      return true;
    } else {
      return false;
    }
  }
}

type generateTokenProps = {
  id: number,
  name: string,
  email: string
}

enum JWT_EXPIRES {
  ONE_HOUR = "1h",
  ONE_DAY = "1d"
}

function generateToken({ id, name, email }: generateTokenProps) {
  return jwt.sign({
    id: id,
    name: name,
    email: email
  },
    String(process.env.JWT_SECRET),
    {
      expiresIn: JWT_EXPIRES.ONE_HOUR
    });
}
