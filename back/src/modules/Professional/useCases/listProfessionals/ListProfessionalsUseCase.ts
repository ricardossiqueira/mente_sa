import { inject, injectable } from "tsyringe";
import { Professional } from "../../entities/Professional";

import { IProfessionalRepository } from "../../repositories/IProfessionalRepository";

@injectable()
class ListProfessionalUseCase {
  constructor(
    @inject("ProfessionalRepository")
    private repository: IProfessionalRepository
  ) {}

  async execute(): Promise<Professional[]> {
    return await this.repository.list();
  }
}

export { ListProfessionalUseCase };
