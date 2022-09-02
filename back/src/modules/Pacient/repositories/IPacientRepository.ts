import { Pacient } from "@prisma/client";

import { ICreatePacientDTO } from "../dto/ICreatePacientDTO";

interface IPacientRepository {
  create(data: ICreatePacientDTO): Promise<void>;
  findByEmail(email: string): Promise<Pacient | null>;
}

export { IPacientRepository };
