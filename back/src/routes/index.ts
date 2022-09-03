import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";

import { authRoutes } from "./auth.routes";
import { pacientRoutes } from "./pacient.routes";
import { professionalRoutes } from "./professional.routes";
import { sessionRoutes } from "./session.routes";

const router = Router();

router.use("/professional", professionalRoutes);
router.use("/auth", authRoutes);
router.use("/pacient", ensureAuth, pacientRoutes);
router.use("/session", ensureAuth, sessionRoutes);

export { router };
