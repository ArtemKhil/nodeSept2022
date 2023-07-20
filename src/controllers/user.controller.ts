import { NextFunction, Request, Response } from "express";

import { userMapper } from "../mappers";
import { User } from "../models";
import { userService } from "../services";
import { IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      const response = userMapper.toResponse(user);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...req.body },
        { new: true }
      );
      const response = userMapper.toResponse(updatedUser);

      return res.status(201).json(response);
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
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
