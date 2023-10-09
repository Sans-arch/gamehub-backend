import { FastifyRequest } from 'fastify/types/request';
import { UserDTO } from '../dtos/UserDTO';
import { UserService } from '../services/UserService';
import { CreateUserRequest } from './types';

export class AuthController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(request: FastifyRequest) {
    const { name, email, password } = request.body as CreateUserRequest;

    if (!name || !email || !password) {
      return {
        code: 400,
        body: {
          message: 'Name, email and password are required.',
        },
      };
    }

    try {
      const user = await this.userService.register(name, email, password);

      return {
        code: 201,
        body: user,
      };
    } catch (error: any) {
      return {
        code: 400,
        body: {
          message: error.message,
        },
      };
    }
  }

  async login(request: any) {
    const { email, password } = request.body;

    if (!email || !password) {
      return {
        code: 400,
        body: {
          message: 'Email and password are required.',
        },
      };
    }

    try {
      const userWithToken = await this.userService.login(email, password);

      return {
        code: 200,
        body: new UserDTO({
          token: userWithToken.token,
          user: {
            id: userWithToken.user.id,
            email: userWithToken.user.email,
            name: userWithToken.user.name,
            password: userWithToken.user.password,
          },
        }),
      };
    } catch (error: any) {
      return {
        code: 200,
        body: {
          message: error.message,
        },
      };
    }
  }
}
