import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/UserRepository/types';
import { UserPersistDTO } from '../dtos/UserDTO';
import { PrismaUserRepository } from '../repositories/UserRepository/UserRepository';

const repository: UserRepository = new PrismaUserRepository();
const jwtSecret = String(process.env.JWT_SECRET);

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

  const accessToken = jwt.sign(
    { id: createdUser.id, email: createdUser.email, name: createdUser.name }, jwtSecret, { expiresIn: "1h" }
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

async function login(email: string, password: string) {
  const user = await repository.findByEmailAndPassword(email, password);

  if (!user) {
    throw new Error('Username or password incorrect!');
  }

  const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, jwtSecret, { expiresIn: "15m" });

  return {
    token: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

async function validateToken(token: string) {
  let user: any;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw new Error('Token is not valid!')
    }

    user = decoded;
  });

  return user;
}

export default { register, login, validateToken }
