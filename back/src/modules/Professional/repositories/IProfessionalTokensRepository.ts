import { ProfessionalTokens } from "@prisma/client";
import { ICreateProfessionalTokensDTO } from "../dto/ICreateProfessionalTokensDTO";

interface IProfessionalTokensRepository {
  create(data: ICreateProfessionalTokensDTO): Promise<ProfessionalTokens>;
}
export { IProfessionalTokensRepository };
