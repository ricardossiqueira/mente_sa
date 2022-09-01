import { request, Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshToken =
      req.body.refreshToken ||
      req.headers["x-access-token"] ||
      request.query.refreshToken;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const tokens = await refreshTokenUseCase.execute(refreshToken);

    return res.json(tokens);
  }
}

export { RefreshTokenController };
