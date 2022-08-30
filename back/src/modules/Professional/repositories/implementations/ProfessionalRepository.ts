import { Prisma, PrismaClient } from "@prisma/client";

import { ICreateProfessionalDTO } from "../../dto/IProfessionalDTO";
import { Professional } from "../../entities/Professional";
import { IProfessionalRepository } from "../IProfessionalRepository";

class ProfessionalRepository implements IProfessionalRepository {
  private repository: Prisma.ProfessionalDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.repository = new PrismaClient().professional;
  }

  async create(data: ICreateProfessionalDTO): Promise<void> {
    await this.repository.create({ data });
  }

  async findById(id: string): Promise<Professional | null> {
    return await this.repository.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Professional | null> {
    return await this.repository.findFirst({ where: { email } });
  }
}

export { ProfessionalRepository };
