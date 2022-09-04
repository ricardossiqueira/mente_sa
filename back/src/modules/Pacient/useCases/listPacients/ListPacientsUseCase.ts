import { Pacient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IPacientRepository } from "../../repositories/IPacientRepository";

@injectable()
class ListPacientsUseCase {
  constructor(
    @inject("PacientRepository")
    private repository: IPacientRepository
  ) {}

  async execute(): Promise<IListPacientDTO[]> {
    const pacients = await this.repository.list();

    const filteredPacients: IListPacientDTO[] = pacients.map(
      (pacient: Pacient) => {
        const { birthDate, cpf, createdAt, updatedAt, telephone, ...rest } =
          pacient;
        return rest;
      }
    );

    return filteredPacients;
  }
}

export { ListPacientsUseCase };
