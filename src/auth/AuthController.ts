import { UserDTO } from '../dtos/UserDTO';
import { AuthService } from './AuthService';

export class AuthController {
  service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  register(request: any) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return {
        code: 400,
        body: {
          message: 'Name, email and password are required.',
        },
      };
    }

    try {
      const user = this.service.register(name, email, password);
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

  login(request: any) {
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
      const body = this.service.login(email, password);

      return {
        code: 200,
        body: new UserDTO(body),
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
