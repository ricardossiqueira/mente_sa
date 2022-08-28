import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProfessionalUseCase } from "./ListProfessionalsUseCase";

class ListProfessionalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listProfessionalUseCase = container.resolve(ListProfessionalUseCase);
    const professionals = await listProfessionalUseCase.execute();

    return res.status(200).json(professionals);
  }
}

export { ListProfessionalController };
