import { Router } from "express";

import { CreateSessionController } from "../modules/Session/useCases/createSession/CreateSessionController";

const sessionRoutes = Router();

const createSessionController = new CreateSessionController();

sessionRoutes.post("/", createSessionController.handle);

export { sessionRoutes };
