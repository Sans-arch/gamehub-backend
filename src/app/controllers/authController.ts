import { NextFunction, Request, Response } from 'express';
import { UserRequestDTO } from '../dtos/UserDTO';
import userService from '../services/userService';

export interface RequestCustom extends Request {
  user?: {
    id: string;
    name: string;
  };
}

async function register(req: Request, res: Response) {
  const { name, email, password } = req.body as UserRequestDTO;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required.',
    });
  }

  try {
    const { token, user } = await userService.register(name, email, password);

    return res.status(201).json({
      token: token,
      user: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required!',
    });
  }

  try {
    const { token, user } = await userService.login(email, password);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

async function verifyToken(req: RequestCustom, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = await userService.validateToken(token);

      req.user = user;
      next();
    } catch (error: any) {
      return res.status(403).json({
        error: error.message
      })
    }
  } else {
    return res.status(401).json({
      error: "You are not authenticated!"
    });
  }
}

export default { register, login, verifyToken }
