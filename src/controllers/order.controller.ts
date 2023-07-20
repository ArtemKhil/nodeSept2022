import { NextFunction, Request, Response } from "express";

import { Order } from "../models";
import { orderService } from "../services";
import { ICommonResponse, IOrder, IQuery, ITokenPayload } from "../types";

class OrderController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrder[]>> {
    try {
      const orders = await orderService.getAllWithPagination(
        req.query as IQuery
      );
      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IOrder>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const order = await orderService.create(req.body, _id);

      return res.status(201).json({ message: "Order created", data: order });
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrder>> {
    try {
      const { order, jwtPayload } = res.locals;

      const result = await orderService.getById(jwtPayload._id, order._id);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrder>> {
    try {
      const { orderId } = req.params;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { ...req.body },
        { new: true }
      );

      return res.status(201).json(updatedOrder);
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { orderId } = req.params;
      await Order.deleteOne({ _id: orderId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
