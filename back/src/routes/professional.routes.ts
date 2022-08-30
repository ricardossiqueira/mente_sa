import { Router } from "express";

import { CreateProfessionalController } from "../modules/Professional/useCases/createProfessional/CreateProfessionalController";

const professionalRoutes = Router();

const createProfessionalController = new CreateProfessionalController();

professionalRoutes.post("/", createProfessionalController.handle);

export { professionalRoutes };
