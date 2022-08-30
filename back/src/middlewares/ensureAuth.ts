import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
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
    throw new AppError("Missing token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    let { sub: userId } = verify(
      token,
      "2554d6895fd6264fd2b47a3b0dd1027f"
    ) as PayloadType;

    const usersRepository = new ProfessionalRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
