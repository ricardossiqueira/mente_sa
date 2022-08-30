import { Professional } from "@prisma/client";
import { ICreateProfessionalDTO } from "../dto/ICreateProfessionalDTO";

interface IProfessionalRepository {
  create(data: ICreateProfessionalDTO): Promise<void>;
  findById(id: string): Promise<Professional | null>;
  findByEmail(email: string): Promise<Professional | null>;
}

export { IProfessionalRepository };
