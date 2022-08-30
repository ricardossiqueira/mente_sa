import { ICreateProfessionalDTO } from "../dto/IProfessionalDTO";
import { Professional } from "../entities/Professional";

interface IProfessionalRepository {
  create(data: ICreateProfessionalDTO): Promise<void>;
  findById(id: string): Promise<Professional | null>;
  findByEmail(email: string): Promise<Professional | null>;
}

export { IProfessionalRepository };
