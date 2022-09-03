import { Pacient, Prisma, PrismaClient } from "@prisma/client";

import { ICreatePacientDTO } from "../../dto/ICreatePacientDTO";
import { IPacientRepository } from "../IPacientRepository";

class PacientRepository implements IPacientRepository {
  private repository: Prisma.PacientDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.repository = new PrismaClient().pacient;
  }
  async findByCPF(cpf: string): Promise<Pacient | null> {
    return await this.repository.findFirst({ where: { cpf } });
  }

  async list(): Promise<Pacient[]> {
    return await this.repository.findMany();
  }

  async findByEmail(email: string): Promise<Pacient | null> {
    return await this.repository.findFirst({ where: { email } });
  }

  async create(data: ICreatePacientDTO): Promise<void> {
    await this.repository.create({ data });
  }
}

export { PacientRepository };
