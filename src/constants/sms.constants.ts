import { ESmsActionEnum } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActionEnum.WELCOME]: "Welcome on our platform",
  [ESmsActionEnum.FORGOT_PASSWORD]: "Let's recover your password",
};
