import Router from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isUserValidForCreate,
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isUserValidForLogin,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/password/change",
  userMiddleware.isUserValidForChangePassword,
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
