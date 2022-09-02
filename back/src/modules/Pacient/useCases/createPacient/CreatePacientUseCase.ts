import { inject, injectable } from "tsyringe";

import { IPacientRepository } from "../../repositories/IPacientRepository";
import { ICreatePacientDTO } from "../../dto/ICreatePacientDTO";
import { isEmailValid } from "../../../../shared/functions/isEmailValid";
import { isTelephoneValid } from "../../../../shared/functions/isTelephoneValid";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreatePacientUseCase {
  constructor(
    @inject("PacientRepository")
    private pacientRepository: IPacientRepository
  ) {}

  async execute(data: ICreatePacientDTO): Promise<void> {
    const { email, telephone } = data;
    isEmailValid(email);
    isTelephoneValid(telephone);

    const pacientAlreadyExists = await this.pacientRepository.findByEmail(
      email
    );

    if (pacientAlreadyExists) {
      throw new AppError("Pacient already exists!", 409);
    }

    await this.pacientRepository.create(data);
  }
}
export { CreatePacientUseCase };
