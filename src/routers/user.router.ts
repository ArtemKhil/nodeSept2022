import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidForCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.isUserValidForUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
