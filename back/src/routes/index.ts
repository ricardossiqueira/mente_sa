import { Router } from "express";

import { professionalRoutes } from "./professional.routes";

const router = Router();

router.use("/professional", professionalRoutes);

export { router };
