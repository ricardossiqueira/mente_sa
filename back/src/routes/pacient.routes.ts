import { Router } from "express";

import { CreatePacientController } from "../modules/Pacient/useCases/createPacient/CreatePacientController";
import { ListPacientsController } from "../modules/Pacient/useCases/listPacients/ListPacientsController";

const pacientRoutes = Router();

const createPacientController = new CreatePacientController();
const listPacientsController = new ListPacientsController();

pacientRoutes.post("/", createPacientController.handle);
pacientRoutes.get("/", listPacientsController.handle);

export { pacientRoutes };
