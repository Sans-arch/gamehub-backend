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
    throw new Error('Email inválido.');
  }

  const user = await repository.findByEmail(email);

  if (user) {
    throw new Error('Este email já está em uso.');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const userToBeCreated: UserPersistDTO = {
    name,
    email,
    password: hashedPassword
  };

  const createdUser = await repository.save(userToBeCreated);

  if (!createdUser) {
    throw new Error('Não é possível criar usuário!');
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
  const user = await repository.findByEmail(email);

  if (!user) {
    throw new Error('Usuário não encontrado!');
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw new Error('Senha incorreta!');
  }

  const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, jwtSecret, { expiresIn: "1h" });

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
      throw new Error('Token não é válido!')
    }

    user = decoded;
  });

  return user;
}

export default { register, login, validateToken }
