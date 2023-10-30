"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("./db/typeorm.config"));
// import authRouter from "./routes/authRouter";
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, typeorm_1.createConnection)(typeorm_config_1.default)
    .then(() => {
    console.log(" 🛜  Database connected successfully");
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});
app.use("/", authRouter_1.default);
app.use("/user", userRouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
