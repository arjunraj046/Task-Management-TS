import { ConnectionOptions } from "typeorm";
import { TaskSchema } from "./models/task";
import { UserSchema } from "./models/user"; 
import dotenv from "dotenv";

dotenv.config();

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserSchema,TaskSchema],
  synchronize: true,
};

 
export default connectionOptions;