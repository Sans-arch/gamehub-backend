import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/UserModel';
import { UserRepository } from '../repositories/UserRepository';

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
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error('User not found.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);

    if (!isSamePassword) {
      throw new Error('Wrong password.');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, String(process.env.JWT_SECRET), { expiresIn: '1d' });

    return { token, user };
  }

  verifyToken(token: any) {
    const jwtSecret = String(process.env.JWT_SECRET);
    const decodedToken = jwt.verify(token, jwtSecret) as any;
    const user = this.repository.findByEmail(decodedToken.email);

    return user;
  }
}
