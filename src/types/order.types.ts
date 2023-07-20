import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface IOrder {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  status: string;
  sum: number;
  already_paid: number;
  manager: IUser | Types.ObjectId;
  utm: string;
  msg: string;
}
