"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./models/task");
const user_1 = require("./models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_1.UserSchema, task_1.TaskSchema],
    synchronize: true,
};
exports.default = connectionOptions;
