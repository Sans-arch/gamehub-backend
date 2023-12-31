import prisma from '../prisma';

import { User } from '../../models/UserModel';
import { UserRepository } from './types';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await prisma.profile.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    return user;
  }

  async save(user: User) {
    const createdUser = await prisma.profile.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return createdUser;
  }
}
