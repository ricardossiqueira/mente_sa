import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";
import { inject, injectable } from "tsyringe";

import { ICreateProfessionalDTO } from "../../dto/ICreateProfessionalDTO";
import { IProfessionalRepository } from "../../repositories/IProfessionalRepository";

@injectable()
class CreateProfessionalUseCase {
  constructor(
    @inject("ProfessionalRepository")
    private repository: IProfessionalRepository
  ) {}

  private isEmailValid(email: string): void {
    const validEmail = email.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    if (!validEmail) throw new AppError("Email inválido", 422);
  }

  private isPasswordValid(password: string): void {
    if (password.length < 8) throw new AppError("Senha inválida");
  }

  private async userAlreadyExists(email: string): Promise<void> {
    const userAlreadyExists = await this.repository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("Usuário já existe", 409);
  }

  async execute(data: ICreateProfessionalDTO): Promise<void> {
    this.isEmailValid(data.email);
    this.isPasswordValid(data.password);
    await this.userAlreadyExists(data.email);

    const { password } = data;

    const password_hash = await hash(password, 8);

    await this.repository.create({ ...data, password: password_hash });
  }
}
export { CreateProfessionalUseCase };
