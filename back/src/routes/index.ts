import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { professionalRoutes } from "./professional.routes";

const router = Router();

router.use("/professional", professionalRoutes);
router.use("/auth", authRoutes);

export { router };
