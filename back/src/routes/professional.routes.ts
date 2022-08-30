import { Router } from "express";

import { CreateProfessionalController } from "../modules/Professional/useCases/createProfessional/CreateProfessionalController";
import { AuthProfessionalController } from "../modules/Professional/useCases/authProfessional/AuthProfessionalController";

const professionalRoutes = Router();

const createProfessionalController = new CreateProfessionalController();
const authProfesssionalController = new AuthProfessionalController();

professionalRoutes.post("/", createProfessionalController.handle);
professionalRoutes.post("/auth", authProfesssionalController.handle);

export { professionalRoutes };
