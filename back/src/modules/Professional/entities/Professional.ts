import { ICreateProfessionalDTO } from "../dto/IProfessionalDTO";

class Professional {
  id?: string;
  name: string;
  crp: string;
  approach: string;
  contact: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ name, approach, contact, crp }: ICreateProfessionalDTO) {
    this.name = name;
    this.approach = approach;
    this.contact = contact;
    this.crp = crp;
  }
}

export { Professional };
