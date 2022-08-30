import { ICreateProfessionalDTO } from "../dto/ICreateProfessionalDTO";

class Professional {
  id?: string;
  name: string;
  password: string;
  email: string;
  crp!: string | null;
  approach!: string | null;
  contact!: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ name, email, password }: ICreateProfessionalDTO) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}

export { Professional };
