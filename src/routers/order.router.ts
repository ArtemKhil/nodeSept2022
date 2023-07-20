import Router from "express";

import { orderController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  orderMiddleware,
} from "../middlewares";
import { OrderValidator } from "../validators";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, orderController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  orderMiddleware.isOrderValidForCreate,
  orderController.create
);

router.get(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderMiddleware.getByIdOrThrow,
  orderController.getById
);

router.put(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  commonMiddleware.isBodyValid(OrderValidator.updateOrder),
  orderMiddleware.getByIdOrThrow,
  orderController.update
);

router.delete(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderMiddleware.getByIdOrThrow,
  orderController.delete
);

export const orderRouter = router;
