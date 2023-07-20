import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Order } from "../models";
import { OrderValidator } from "../validators";

class OrderMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        throw new ApiError("Order not found", 422);
      }
      res.locals.order = order;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isOrderValidForCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = OrderValidator.createOrder.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const orderMiddleware = new OrderMiddleware();
