import { Professional } from "./Professional";

class ProfessionalTokens {
  id!: string;
  refreshToken!: string;
  expiresAt!: Date;
  professional!: Professional;
  professionalId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(professional: Professional) {}
}

export { ProfessionalTokens };
