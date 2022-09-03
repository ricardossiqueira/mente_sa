import { Router } from "express";
import { MeController } from "src/modules/Professional/useCases/me/MeController";
import { ensureAuth } from "../middlewares/ensureAuth";

import { authRoutes, meRoutes } from "./auth.routes";
import { pacientRoutes } from "./pacient.routes";
import { professionalRoutes } from "./professional.routes";
import { sessionRoutes } from "./session.routes";

const router = Router();

router.use("/professional", professionalRoutes);
router.use("/auth", authRoutes);
router.use("/pacient", ensureAuth, pacientRoutes);
router.use("/session", ensureAuth, sessionRoutes);
router.use("/auth", ensureAuth, meRoutes);

export { router };
