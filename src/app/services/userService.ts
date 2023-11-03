import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/UserRepository/types';
import { UserPersistDTO } from '../dtos/UserDTO';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';

enum JWT_EXPIRES {
  ONE_HOUR = "1h",
  ONE_DAY = "1d"
}

const repository: UserRepository = new PrismaUserRepository();

async function register(name: string, email: string, password: string) {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email.match(emailRegex)) {
    throw new Error('Invalid email.');
  }

  const user = await repository.findByEmail(email);

  if (user) {
    throw new Error('This email was already used by another user.');
  }

  const userToBeCreated: UserPersistDTO = {
    name,
    email,
    password: bcrypt.hashSync(password, 10)
  };

  const createdUser = await repository.save(userToBeCreated);

  if (!createdUser) {
    throw new Error('Cannot create user!');
  }

  const jwtToken = jwt.sign(
    { id: createdUser.id, email: createdUser.email, name: createdUser.name },
    String(process.env.JWT_SECRET),
    { expiresIn: JWT_EXPIRES.ONE_HOUR }
  );

  return jwtToken;
}

async function login(email: string, password: string) {
  const user = await repository.findByEmailAndPassword(email, password);

  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const jwtToken = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    String(process.env.JWT_SECRET),
    { expiresIn: JWT_EXPIRES.ONE_HOUR }
  );

  return {
    token: jwtToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

async function validateToken(token: string) {
  const JWT_SECRET = String(process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    console.log({ decoded });

    return {
      token,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      },
    };
  } catch (error) {
    return false;
  }
}

export default { register, login, validateToken }
