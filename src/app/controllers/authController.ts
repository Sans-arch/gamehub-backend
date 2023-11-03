import { Request, Response } from 'express';
import userService from '../services/userService';
import { UserRequestDTO } from '../dtos/UserDTO';

async function register(req: Request, res: Response) {
  const { name, email, password } = req.body as UserRequestDTO;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required.',
    });
  }

  try {
    const token = await userService.register(name, email, password);

    return res.status(201).json({
      token: token,
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
      message: 'Email and password are required.',
    });
  }

  try {
    const { token, user } = await userService.login(email, password);

    return res.status(200).json({
      token: token,
      user: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

async function verifyToken(req: Request, res: Response) {
  const { token } = req.body;

  const data = await userService.validateToken(token);

  if (!data) {
    return res.status(400).json({
      message: 'Token JWT não é válido',
    });
  }

  return res.status(200).json({
    token: token,
    user: data.user,
  });
}


export default { register, login, verifyToken }
