import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";
import { AppError } from "../errors/AppError";
import { ProfessionalRepository } from "../modules/Professional/repositories/implementations/ProfessionalRepository";

type PayloadType = {
  sub: string;
};

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token faltando", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    let { sub: id } = verify(token, auth.token.secret) as PayloadType;

    const usersRepository = new ProfessionalRepository();
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    req.professional = { id };

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}
