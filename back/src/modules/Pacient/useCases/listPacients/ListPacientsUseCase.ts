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

    const filteredPacients: IListPacientDTO[] = pacients.map((pacient) => {
      return {
        id: pacient.id,
        name: pacient.name,
      };
    });

    return filteredPacients;
  }
}

export { ListPacientsUseCase };
