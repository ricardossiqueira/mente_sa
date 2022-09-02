import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPacientsUseCase } from "./ListPacientsUseCase";

class ListPacientsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listPacientsUseCase = container.resolve(ListPacientsUseCase);

    const pacients = await listPacientsUseCase.execute();

    return res.status(200).json(pacients);
  }
}

export { ListPacientsController };
