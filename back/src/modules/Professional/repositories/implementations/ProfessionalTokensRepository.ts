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

  async findByIdAndRefreshToken(
    professionalId: string,
    refreshToken: string
  ): Promise<ProfessionalTokens | null> {
    return await this.repository.findFirst({
      where: { AND: [{ professionalId }, { refreshToken }] },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }
}

export { ProfessionalTokensRepository };
