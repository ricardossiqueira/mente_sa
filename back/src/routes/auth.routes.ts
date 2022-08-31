import { Router } from "express";
import { RefreshTokenController } from "../modules/Professional/useCases/refreshToken/RefreshTokenController";

import { AuthProfessionalController } from "../modules/Professional/useCases/authProfessional/AuthProfessionalController";

const authRoutes = Router();

const authProfesssionalController = new AuthProfessionalController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authProfesssionalController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
