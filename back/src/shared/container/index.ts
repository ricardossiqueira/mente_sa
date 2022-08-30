import { container } from "tsyringe";

import { ProfessionalRepository } from "../../modules/Professional/repositories/implementations/ProfessionalRepository";
import { IProfessionalRepository } from "../../modules/Professional/repositories/IProfessionalRepository";

import { ProfessionalTokensRepository } from "../../modules/Professional/repositories/implementations/ProfessionalTokensRepository";
import { IProfessionalTokensRepository } from "../../modules/Professional/repositories/IProfessionalTokensRepository";

container.registerSingleton<IProfessionalRepository>(
  "ProfessionalRepository",
  ProfessionalRepository
);

container.registerSingleton<IProfessionalTokensRepository>(
  "ProfessionalTokensRepository",
  ProfessionalTokensRepository
);
