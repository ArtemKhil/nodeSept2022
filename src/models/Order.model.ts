import { model, Schema, Types } from "mongoose";

import { ECourse, ECourseFormat, ECourseType, EOrderStatus } from "../enums";
import { IOrder } from "../types";
import { User } from "./User.model";

const orderSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    course: {
      type: String,
      enum: ECourse,
    },
    course_format: {
      type: String,
      enum: ECourseFormat,
    },
    course_type: {
      type: String,
      enum: ECourseType,
    },
    status: {
      type: String,
      enum: EOrderStatus,
    },
    sum: {
      type: Number,
    },
    already_paid: {
      type: Number,
    },
    manager: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    group: {
      type: String,
    },
    utm: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Order = model<IOrder>("order", orderSchema);
