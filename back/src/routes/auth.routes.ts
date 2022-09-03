import { Router } from "express";
import { RefreshTokenController } from "../modules/Professional/useCases/refreshToken/RefreshTokenController";

import { AuthProfessionalController } from "../modules/Professional/useCases/authProfessional/AuthProfessionalController";
import { MeController } from "../modules/Professional/useCases/me/MeController";

const authRoutes = Router();

const meRoutes = Router();

const authProfesssionalController = new AuthProfessionalController();
const refreshTokenController = new RefreshTokenController();

const meController = new MeController();

authRoutes.post("/sessions", authProfesssionalController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

meRoutes.get("/me", meController.handle);

export { authRoutes, meRoutes };
