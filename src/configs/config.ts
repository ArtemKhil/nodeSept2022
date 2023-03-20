import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL || "https://myProject.com",

  ACCESS_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "AAA",
  REFRESH_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "RRR",
};
