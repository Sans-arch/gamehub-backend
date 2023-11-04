import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface RequestCustom extends Request {
  userId?: string;
}

type TokenPayload = {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export function AuthMiddlewares(req: RequestCustom, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não foi provido!'
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, String(process.env.JWT_SECRET));
    const { id } = decoded as TokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido!" })
  }
}
