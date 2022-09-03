import { container } from "tsyringe";

import { IProfessionalRepository } from "../../modules/Professional/repositories/IProfessionalRepository";
import { ProfessionalRepository } from "../../modules/Professional/repositories/implementations/ProfessionalRepository";

import { IProfessionalTokensRepository } from "../../modules/Professional/repositories/IProfessionalTokensRepository";
import { ProfessionalTokensRepository } from "../../modules/Professional/repositories/implementations/ProfessionalTokensRepository";

import { IPacientRepository } from "../../modules/Pacient/repositories/IPacientRepository";
import { PacientRepository } from "../../modules/Pacient/repositories/implementations/PacientRepository";

import { ISessionRepository } from "../../modules/Session/repositories/ISessionRepository";
import { SessionRepository } from "../../modules/Session/repositories/implementations/SessionRepository";

container.registerSingleton<IProfessionalRepository>(
  "ProfessionalRepository",
  ProfessionalRepository
);

container.registerSingleton<IProfessionalTokensRepository>(
  "ProfessionalTokensRepository",
  ProfessionalTokensRepository
);

container.registerSingleton<IPacientRepository>(
  "PacientRepository",
  PacientRepository
);

container.registerSingleton<ISessionRepository>(
  "SessionRepository",
  SessionRepository
);
