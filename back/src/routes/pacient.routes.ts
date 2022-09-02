import { Router } from "express";

import { CreatePacientController } from "../modules/Pacient/useCases/createPacient/CreatePacientController";

const pacientRoutes = Router();

const createPacientController = new CreatePacientController();

pacientRoutes.post("/", createPacientController.handle);

export { pacientRoutes };
