import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Welcome on our platform",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Password reset",
    templateName: "forgotPassword",
  },
};
