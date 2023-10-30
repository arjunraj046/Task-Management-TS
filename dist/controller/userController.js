"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskWithID = exports.updateTaskWithID = exports.creatNewTask = exports.retrieveSpecificTask = exports.retrieveTaskList = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userTaskRepository_1 = require("../db/repository/userTaskRepository");
// GET /tasks: Retrieve a list of all tasks
exports.retrieveTaskList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("retrieveTaskList", req.user);
    try {
        //   // Ensure req.user is correctly set by your JWT middleware
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        //   // Call the function to fetch the task list
        const taskList = yield (0, userTaskRepository_1.retrieveUserTaskList_DB)(Number(userId));
        res.status(200).json(taskList);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while creating the task" });
    }
}));
// GET /tasks/:id: Retrieve a specific task by its ID
exports.retrieveSpecificTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log("retrieveSpecificTask");
    try {
        const taskId = Number(req.params.id);
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid Task ID" });
            return;
        }
        // Call the function to fetch the task with ID
        const task = yield (0, userTaskRepository_1.retrieveSpecificTask_DB)(Number(userId), taskId);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
        }
        else {
            res.json(task);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while retrieving the task" });
    }
}));
// POST /tasks: Create a new task
exports.creatNewTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    console.log("creatNewTask");
    try {
        const { title, description, dueDate } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!title) {
            res.status(400).json({ error: "Title is required" });
        }
        else {
            // Call the function to create a new task in the database
            const newTask = yield (0, userTaskRepository_1.creatNewTask_DB)(Number(userId), title, description, dueDate);
            if (newTask) {
                res.status(201).json(newTask);
            }
            else {
                res.status(500).json({ error: "Internal Server Error: Failed to create the task" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while creating the task" });
    }
}));
// PUT /tasks/:id: Update a task by its ID
exports.updateTaskWithID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    console.log("updateTaskWithID");
    try {
        const taskId = Number(req.params.id);
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid Task ID" });
            return;
        }
        const { title, description, dueDate, completed } = req.body;
        const updatedTask = yield (0, userTaskRepository_1.updateTaskWithID_DB)(Number(userId), taskId, title, description, dueDate, completed);
        if (!updatedTask) {
            res.status(404).json({ error: "Task not found" });
        }
        else {
            res.json(updatedTask);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the task" });
    }
}));
// DELETE /tasks/:id: Delete a task by its ID
exports.deleteTaskWithID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    console.log("deleteTaskWithID");
    try {
        const taskId = Number(req.params.id);
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid Task ID" });
            return;
        }
        // Call the function to delete the task with the specified ID
        const deletedTask = yield (0, userTaskRepository_1.deleteTaskWithID_DB)(Number(userId), taskId);
        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
        }
        else {
            res.json({ message: "Task deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the task" });
    }
}));
