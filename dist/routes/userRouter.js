"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userRouter = (0, express_1.Router)();
// GET /tasks: Retrieve a list of all tasks //
userRouter.get("/task", authMiddleware_1.default, userController_1.retrieveTaskList);
// GET /tasks/:id: Retrieve a specific task by its ID //
userRouter.get("/task/:id", authMiddleware_1.default, userController_1.retrieveSpecificTask);
// POST /tasks: Create a new task //
userRouter.post("/task", authMiddleware_1.default, userController_1.creatNewTask);
// PUT /tasks/:id: Update a task by its ID
userRouter.put("/task/:id", authMiddleware_1.default, userController_1.updateTaskWithID);
// DELETE /tasks/:id: Delete a task by its ID
userRouter.delete("/task/:id", authMiddleware_1.default, userController_1.deleteTaskWithID);
exports.default = userRouter;
