import { Router } from "express";

import { CreateProfessionalController } from "../modules/Professional/useCases/createProfessional/CreateProfessionalController";
import { ListProfessionalController } from "../modules/Professional/useCases/listProfessionals/ListProfessionalsController";

const professionalRoutes = Router();

const createProfessionalController = new CreateProfessionalController();
const listProfessionalController = new ListProfessionalController();

professionalRoutes.post("/", createProfessionalController.handle);
professionalRoutes.get("/", listProfessionalController.handle);

export { professionalRoutes };
