import express, { Application, NextFunction, Request, Response } from "express";
import * as http from "http";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { authRouter, orderRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app: Application = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({ message: err.message, status });
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("Welcome");
});
server.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL).then();
  console.log(`Server listen ${configs.PORT}`);
});
