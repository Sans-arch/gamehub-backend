import { User } from '../models/userModel';
import prisma from './prisma';

export class UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    return user;
  }

  async save(user: User) {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return createdUser;
  }
}
