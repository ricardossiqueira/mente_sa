import { ICreateProfessionalDTO } from "../dto/IProfessionalDTO";
import { Professional } from "../entities/Professional";

interface IProfessionalRepository {
  create(data: ICreateProfessionalDTO): Promise<void>;
  list(): Promise<Professional[]>;
}

export { IProfessionalRepository };
