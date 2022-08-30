import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateProfessionalDTO } from "../../dto/IProfessionalDTO";
import { CreateProfessionalUseCase } from "./CreateProfessionalUseCase";

class CreateProfessionalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, email }: ICreateProfessionalDTO = req.body;

    const createProfessionalUseCase = container.resolve(
      CreateProfessionalUseCase
    );

    await createProfessionalUseCase.execute({
      name,
      password,
      email,
    });

    return res.status(201).send();
  }
}
export { CreateProfessionalController };
