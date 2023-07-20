import * as Joi from "joi";

import { regexConstants } from "../constants";
import { ECourse, ECourseFormat, ECourseType, EOrderStatus } from "../enums";

export class OrderValidator {
  private static firstName = Joi.string().min(2).max(50);
  private static surname = Joi.string().min(2).max(50);
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .max(50)
    .lowercase()
    .trim();
  private static phone = Joi.string().regex(regexConstants.PHONE);
  private static age = Joi.number();
  private static course = Joi.valid(...Object.values(ECourse));
  private static course_format = Joi.valid(...Object.values(ECourseFormat));
  private static course_type = Joi.valid(...Object.values(ECourseType));
  private static status = Joi.valid(...Object.values(EOrderStatus));
  private static sum = Joi.number();
  private static already_paid = Joi.number();
  private static group = Joi.string();
  private static utm = Joi.string();
  private static msg = Joi.string();

  public static createOrder = Joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    email: this.email.required(),
    phone: this.phone.required(),
    age: this.age.required(),
    course: this.course.required(),
    course_format: this.course_format.required(),
    course_type: this.course_type.required(),
    status: this.status.required(),
    sum: this.sum.required().allow(null),
    already_paid: this.already_paid.required().allow(null),
    group: this.group.required().allow("").allow(null),
    utm: this.utm.required().allow("").allow(null),
    msg: this.msg.required().allow("").allow(null),
  });
  public static updateOrder = Joi.object({
    name: this.firstName.optional().allow(""),
    surname: this.surname.optional().allow(""),
    email: this.email.optional().allow(""),
    phone: this.phone.optional().allow(""),
    age: this.age.optional().allow("").allow(null),
    course: this.course.optional().allow(""),
    course_format: this.course_format.optional().allow(""),
    course_type: this.course_type.optional().allow(""),
    status: this.status.optional().allow(""),
    sum: this.sum.optional().allow("").allow(null),
    already_paid: this.already_paid.optional().allow("").allow(null),
    group: this.group.optional().allow("").allow(null),
    utm: this.utm.optional().allow("").allow(null),
    msg: this.msg.optional().allow("").allow(null),
  });
}
