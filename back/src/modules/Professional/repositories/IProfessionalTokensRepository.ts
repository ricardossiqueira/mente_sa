import { ProfessionalTokens } from "@prisma/client";
import { ICreateProfessionalTokensDTO } from "../dto/ICreateProfessionalTokensDTO";

interface IProfessionalTokensRepository {
  create(data: ICreateProfessionalTokensDTO): Promise<ProfessionalTokens>;
  findByIdAndRefreshToken(
    professionalId: string,
    refreshToken: string
  ): Promise<ProfessionalTokens | null>;
  deleteById(professionalId: string): Promise<void>;
}
export { IProfessionalTokensRepository };
