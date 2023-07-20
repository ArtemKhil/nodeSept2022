import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Order } from "../models";
import { IOrder, IPaginationResponse, IQuery } from "../types";

class OrderService {
  public async getAllWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IOrder>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 25,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const orders = await Order.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const ordersTotalCount = await Order.count();

      return {
        data: orders,
        itemsCount: ordersTotalCount,
        itemsFound: orders.length,
        page: +page,
        perPage: +limit,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IOrder, userId: string): Promise<IOrder> {
    try {
      return await Order.create({
        ...data,
        manager: new Types.ObjectId(userId),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(userId: string, orderId: string): Promise<IOrder> {
    try {
      return Order.findById(orderId).populate({
        path: "manager",
        select: "role",
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const orderService = new OrderService();
