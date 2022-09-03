import { Pacient } from "@prisma/client";

import { ICreatePacientDTO } from "../dto/ICreatePacientDTO";

interface IPacientRepository {
  create(data: ICreatePacientDTO): Promise<void>;
  findByEmail(email: string): Promise<Pacient | null>;
  findByCPF(cpf: string): Promise<Pacient | null>;
  list(): Promise<Pacient[]>;
}

export { IPacientRepository };
