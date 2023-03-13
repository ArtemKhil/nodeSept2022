import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../types/user.types";
export class UserValidator {
  private static fullName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .max(50)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  public static createUser = Joi.object({
    name: this.fullName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });
  public static updateUser = Joi.object({
    name: this.fullName,
    gender: this.gender,
  });
}
