import { FastifyRequest } from 'fastify/types/request';
import { UserService } from '../services/UserService';
import { LoginUserRequest, RetrieveUserRequest, RevogueTokenRequest } from './types';
import { UserRequestDTO, UserResponseDTO } from '../dtos/UserDTO';

interface ResponsePattern<T> {
  code: number;
  body: T;
}

interface ResponseMessage {
  message: string;
}

export class AuthController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(request: FastifyRequest): Promise<ResponsePattern<UserResponseDTO | ResponseMessage>> {
    const { name, email, password } = request.body as UserRequestDTO;

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
        body: {
          user: {
            id: user.id,
            email: user.email,
            name: user.email
          }
        }
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

  async login(request: FastifyRequest): Promise<ResponsePattern<UserResponseDTO | ResponseMessage>> {
    const { email, password } = request.body as LoginUserRequest;

    if (!email || !password) {
      return {
        code: 400,
        body: {
          message: 'Email and password are required.',
        },
      };
    }

    try {
      const userDTO = await this.userService.login(email, password);

      return {
        code: 200,
        body: userDTO,
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

  async retrieveUserByToken(request: FastifyRequest): Promise<ResponsePattern<UserResponseDTO | ResponseMessage>> {
    const { token } = request.body as RetrieveUserRequest;

    const userDTO = await this.userService.retrieveUserByToken(token);

    return {
      code: 200,
      body: userDTO,
    };
  }

  async revogueToken(request: FastifyRequest): Promise<ResponsePattern<UserResponseDTO | ResponseMessage>> {
    const { token } = request.body as RevogueTokenRequest;

    if (!token) {
      return {
        code: 400,
        body: {
          message: "Token JWT ausente na solicitação"
        }
      }
    }

    const isRevogued = await this.userService.revogueToken(token);

    if (!isRevogued) {
      return {
        code: 400,
        body: {
          message: "Token JWT não foi revogado!"
        }
      }
    }

    return {
      code: 200,
      body: {
        message: "Token JWT revogado com sucesso!"
      }
    }
  }
}
