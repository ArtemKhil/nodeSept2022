import { model, Schema } from "mongoose";

import { EUserRole } from "../enums";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      default: "admin@gmail.com",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      default: "admin",
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: EUserRole,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("user", userSchema);
