import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateSessionDTO } from "../../dto/ICreateSessionDTO";
import { CreateSessionUseCase } from "./CreateSessionUseCase";

class CreateSessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      duration,
      pacientId,
      scheduleDate,
      sessionTheme,
      sessionType,
    }: ICreateSessionDTO = req.body;
    const professionalId = req.professional.id;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    await createSessionUseCase.execute({
      duration,
      pacientId,
      professionalId,
      scheduleDate,
      sessionTheme,
      sessionType,
    });

    return res.status(201).send();
  }
}

export { CreateSessionController };
