import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { creatNewTask_DB, deleteTaskWithID_DB, retrieveSpecificTask_DB, retrieveUserTaskList_DB, updateTaskWithID_DB } from "../db/repository/userTaskRepository";

// GET /tasks: Retrieve a list of all tasks
export const retrieveTaskList = asyncHandler(async (req: Request, res: Response) => {
  console.log("retrieveTaskList", req.user);
  try {
    //   // Ensure req.user is correctly set by your JWT middleware
    const userId = req.user?.id;

    //   // Call the function to fetch the task list
    const taskList = await retrieveUserTaskList_DB(Number(userId));

    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while creating the task" });
  }
});

// GET /tasks/:id: Retrieve a specific task by its ID
export const retrieveSpecificTask = asyncHandler(async (req: Request, res: Response) => {
  console.log("retrieveSpecificTask");
  try {
    const taskId: number = Number(req.params.id);
    const userId = req.user?.id;
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid Task ID" });
      return;
    }

    // Call the function to fetch the task with ID
    const task = await retrieveSpecificTask_DB(Number(userId), taskId);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while retrieving the task" });
  }
});

// POST /tasks: Create a new task
export const creatNewTask = asyncHandler(async (req: Request, res: Response) => {
  console.log("creatNewTask");
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user?.id;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
    } else {
      // Call the function to create a new task in the database
      const newTask = await creatNewTask_DB(Number(userId), title, description, dueDate);

      if (newTask) {
        res.status(201).json(newTask);
      } else {
        res.status(500).json({ error: "Internal Server Error: Failed to create the task" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while creating the task" });
  }
});

// PUT /tasks/:id: Update a task by its ID
export const updateTaskWithID = asyncHandler(async (req: Request, res: Response) => {
  console.log("updateTaskWithID");
  try {
    const taskId: number = Number(req.params.id);
    const userId = req.user?.id;
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid Task ID" });
      return;
    }
    const { title, description, dueDate, completed } = req.body;

    const updatedTask = await updateTaskWithID_DB(Number(userId), taskId, title, description, dueDate, completed);

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the task" });
  }
});

// DELETE /tasks/:id: Delete a task by its ID
export const deleteTaskWithID = asyncHandler(async (req: Request, res: Response) => {
  console.log("deleteTaskWithID");
  try {
    const taskId: number = Number(req.params.id);
    const userId = req.user?.id;
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid Task ID" });
      return;
    }
    // Call the function to delete the task with the specified ID
    const deletedTask = await deleteTaskWithID_DB(Number(userId), taskId);

    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the task" });
  }
});
