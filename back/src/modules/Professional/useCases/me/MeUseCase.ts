import { Professional } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IProfessionalRepository } from "../../repositories/IProfessionalRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class MeUseCase {
  constructor(
    @inject("ProfessionalRepository")
    private repository: IProfessionalRepository
  ) {}

  async execute(id: string): Promise<Professional> {
    const professional = await this.repository.findById(id);
    if (!professional) throw new AppError("Erro ao buscar dados");
    return professional;
  }
}
export { MeUseCase };
