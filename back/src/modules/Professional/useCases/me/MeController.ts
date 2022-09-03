import { Request, Response } from "express";
import { container } from "tsyringe";

import { MeUseCase } from "./MeUseCase";

class MeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.professional.id;

    const meUseCase = container.resolve(MeUseCase);

    const { password, ...professional } = await meUseCase.execute(id);

    return res.status(200).json({ ...professional });
  }
}

export { MeController };
