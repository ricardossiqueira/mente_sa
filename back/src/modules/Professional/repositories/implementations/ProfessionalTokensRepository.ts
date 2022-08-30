import { Prisma, PrismaClient, ProfessionalTokens } from "@prisma/client";

import { ICreateProfessionalTokensDTO } from "../../dto/ICreateProfessionalTokensDTO";
import { IProfessionalTokensRepository } from "../IProfessionalTokensRepository";

class ProfessionalTokensRepository implements IProfessionalTokensRepository {
  private repository: Prisma.ProfessionalTokensDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.repository = new PrismaClient().professionalTokens;
  }

  async create(
    data: ICreateProfessionalTokensDTO
  ): Promise<ProfessionalTokens> {
    return await this.repository.create({ data });
  }
}

export { ProfessionalTokensRepository };
