import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreatePacientDTO } from "../../dto/ICreatePacientDTO";

import { CreatePacientUseCase } from "./CreatePacientUseCase";

class CreatePacientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { address, birthDate, cpf, email, gender, name, telephone } =
      req.body as ICreatePacientDTO;

    const createPacientUseCase = container.resolve(CreatePacientUseCase);

    await createPacientUseCase.execute({
      address,
      birthDate,
      cpf,
      email,
      gender,
      name,
      telephone,
    });

    return res.status(201).send();
  }
}

export { CreatePacientController };
