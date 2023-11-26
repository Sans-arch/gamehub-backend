import { UserRepository } from '../../app/repositories/UserRepository/types';
import { UserService } from '../../app/services/userService'
import { User } from '../../app/models/UserModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('UserService test suite', () => {
  let userService: UserService;
  const userDb: User[] = [{
    id: 1,
    name: 'Test',
    email: 'test@test.com',
    createdAt: new Date(),
    password: bcrypt.hashSync('123456', 10),
  }, {
    id: 2,
    name: 'Richard',
    email: 'richard@test.com',
    createdAt: new Date(),
    password: bcrypt.hashSync('123456', 10),
  }];

  beforeEach(() => {
    const mockUserRepository: UserRepository = {
      findByEmail(email) {
        const user = userDb.find(user => user.email === email);

        if (user) {
          return Promise.resolve({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            created_at: user.createdAt
          });
        }

        return Promise.resolve(null);
      },
      findByEmailAndPassword(email, password) {
        const user = userDb.find(user => user.email === email && user.password === password);

        if (user) {
          return Promise.resolve({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            created_at: user.createdAt
          });
        }

        return Promise.resolve(null);
      },
      save(user) {
        const newUser = {
          id: userDb.length + 1,
          name: user.name,
          email: user.email,
          password: user.password,
          created_at: new Date()
        };

        userDb.push({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          createdAt: newUser.created_at
        });

        return Promise.resolve(newUser);
      },
    };

    userService = new UserService(mockUserRepository);
  });

  it('should login with correct email and password', async () => {
    const email = 'test@test.com';
    const password = '123456';

    const loggedUser = await userService.login(email, password);

    expect(loggedUser).toHaveProperty('token');
    expect(loggedUser).toHaveProperty('user');
    expect(loggedUser.user.email).toBe(email);
  });

  it('should be possible to create a new user', async () => {
    const createPayload = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234567',
    };

    const createdUser = await userService.register(createPayload.name, createPayload.email, createPayload.password);

    expect(createdUser).toHaveProperty('token');
    expect(createdUser).toHaveProperty('user');
    expect(createdUser.user.email).toBe(createPayload.email);
    expect(createdUser.user.name).toBe(createPayload.name);
  });

  it('should not create a new user with invalid email', async () => {
    const createPayload = {
      name: 'John Doe',
      email: 'invalidemail',
      password: '1234567',
    };

    await expect(userService.register(createPayload.name, createPayload.email, createPayload.password)).rejects.toThrow();
  });

  it('should be possible to validate an valid token', async () => {
    const jwtSecret = String(process.env.JWT_SECRET);

    const token = jwt.sign({ id: 1, email: 'carlos@test.com', name: 'Carlos' }, jwtSecret);

    await expect(userService.validateToken(token)).resolves.toBeTruthy();
  });

  it('should be possible to validate an invalid token', async () => {
    const jwtSecret = 'WrongSecret';

    const token = jwt.sign('test', jwtSecret);

    await expect(userService.validateToken(token)).rejects.toThrow();
  });
});
