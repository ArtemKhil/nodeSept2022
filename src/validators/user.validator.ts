import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EUserRole } from "../enums";

export class UserValidator {
  private static fullName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .max(50)
    .lowercase()
    .trim();
  private static password = Joi.string();
  private static role = Joi.valid(...Object.values(EUserRole));

  public static registerUser = Joi.object({
    name: this.fullName.required(),
    email: this.email.required(),
    password: this.password.required(),
    role: this.role.required(),
  });
  public static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static updateUser = Joi.object({
    name: this.fullName,
    role: this.role,
  });
  // static emailValidator = Joi.object({
  //   email: this.email.required(),
  // });
}
