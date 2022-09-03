import { inject, injectable } from "tsyringe";

import { IPacientRepository } from "../../repositories/IPacientRepository";
import { ICreatePacientDTO } from "../../dto/ICreatePacientDTO";
import { isEmailValid } from "../../../../shared/functions/isEmailValid";
import { isTelephoneValid } from "../../../../shared/functions/isTelephoneValid";
import { AppError } from "../../../../errors/AppError";
import { isCPFValid } from "../../../../shared/functions/isCPFValid";

@injectable()
class CreatePacientUseCase {
  constructor(
    @inject("PacientRepository")
    private pacientRepository: IPacientRepository
  ) {}

  async execute(data: ICreatePacientDTO): Promise<void> {
    const { email, telephone, cpf } = data;
    isEmailValid(email);
    isCPFValid(cpf);
    isTelephoneValid(telephone);

    const emailAlreadyRegistered = await this.pacientRepository.findByEmail(
      email
    );

    if (emailAlreadyRegistered) {
      throw new AppError(
        "Já existe um paciente cadaastrado com esse email",
        409
      );
    }

    const cpfAlreadyRegistered = await this.pacientRepository.findByCPF(cpf);

    if (cpfAlreadyRegistered) {
      throw new AppError("Já existe um paciente cadastrado com esse CPF", 409);
    }

    await this.pacientRepository.create(data);
  }
}
export { CreatePacientUseCase };
