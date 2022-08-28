import { inject, injectable } from "tsyringe";

import { ICreateProfessionalDTO } from "../../dto/IProfessionalDTO";
import { IProfessionalRepository } from "../../repositories/IProfessionalRepository";

@injectable()
class CreateProfessionalUseCase {
  constructor(
    @inject("ProfessionalRepository")
    private repository: IProfessionalRepository
  ) {}

  async execute(data: ICreateProfessionalDTO): Promise<void> {
    await this.repository.create(data);
  }
}
export { CreateProfessionalUseCase };
