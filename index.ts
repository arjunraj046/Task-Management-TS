import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import connectionOptions from "./db/typeorm.config";
// import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

createConnection(connectionOptions)
  .then(() => {
    console.log(" 🛜  Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use("/", authRouter);
app.use("/user", userRouter);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
