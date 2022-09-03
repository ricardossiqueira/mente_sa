import { Prisma, PrismaClient } from "@prisma/client";
import { ICreateSessionDTO } from "../../dto/ICreateSessionDTO";

class SessionRepository {
  private repository: Prisma.SessionDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.repository = new PrismaClient().session;
  }

  async create(data: ICreateSessionDTO): Promise<void> {
    await this.repository.create({ data });
  }
}

export { SessionRepository };
