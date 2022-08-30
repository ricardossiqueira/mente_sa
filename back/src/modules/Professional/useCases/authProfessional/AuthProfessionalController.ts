import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthProfessionalUseCase } from "./AuthProfessionalUseCase";

class AuthProfessionalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authProfessionalUseCase = container.resolve(AuthProfessionalUseCase);

    const token = await authProfessionalUseCase.execute({ email, password });

    return res.status(200).json(token);
  }
}

export { AuthProfessionalController };
