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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskWithID_DB = exports.updateTaskWithID_DB = exports.creatNewTask_DB = exports.retrieveSpecificTask_DB = exports.retrieveUserTaskList_DB = void 0;
const typeorm_1 = require("typeorm");
const task_1 = require("../models/task");
// GET /tasks: Retrieve a list of all tasks
const retrieveUserTaskList_DB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.TaskSchema);
    try {
        const tasks = yield TaskRepository.find({
            where: {
                userId: id,
            },
        });
        return tasks;
    }
    catch (error) {
        throw error;
    }
});
exports.retrieveUserTaskList_DB = retrieveUserTaskList_DB;
// GET /tasks/:id: Retrieve a specific task by its ID
const retrieveSpecificTask_DB = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.TaskSchema);
    try {
        const options = {
            where: { id: taskId, userId: userId },
        };
        const response = yield TaskRepository.findOne(options);
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.retrieveSpecificTask_DB = retrieveSpecificTask_DB;
// POST /tasks: Create a new task
const creatNewTask_DB = (userId, title, description, dueDate) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.TaskSchema);
    try {
        const response = yield TaskRepository.save({
            userId: userId,
            title: title,
            description: description,
            dueDate: dueDate,
        });
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.creatNewTask_DB = creatNewTask_DB;
// PUT /tasks/:id: Update a task by its ID
const updateTaskWithID_DB = (userId, taskId, title, description, dueDate, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.TaskSchema);
    try {
        const options = {
            where: { id: taskId, userId: userId },
        };
        const task = yield TaskRepository.findOne(options);
        if (!task) {
            return null;
        }
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.completed = completed;
        const updatedTask = yield TaskRepository.save(task);
        return updatedTask;
    }
    catch (error) {
        throw error;
    }
});
exports.updateTaskWithID_DB = updateTaskWithID_DB;
// DELETE /tasks/:id: Delete a task by its ID
const deleteTaskWithID_DB = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.TaskSchema);
    try {
        const options = {
            where: { id: taskId, userId: userId },
        };
        const task = yield TaskRepository.findOne(options);
        if (!task) {
            return null;
        }
        yield TaskRepository.remove(task);
        return task;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTaskWithID_DB = deleteTaskWithID_DB;
