import { container } from "tsyringe";

import { ProfessionalRepository } from "../../modules/Professional/repositories/implementations/ProfessionalRepository";
import { IProfessionalRepository } from "../../modules/Professional/repositories/IProfessionalRepository";

container.registerSingleton<IProfessionalRepository>(
  "ProfessionalRepository",
  ProfessionalRepository
);
