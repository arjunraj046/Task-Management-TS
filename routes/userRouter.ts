import { Router } from "express";
import { creatNewTask, deleteTaskWithID, retrieveSpecificTask, retrieveTaskList, updateTaskWithID } from "../controller/userController";
import authenticateJWT from "../middleware/authMiddleware";

const userRouter = Router();

// GET /tasks: Retrieve a list of all tasks //
userRouter.get("/tasks/:page", authenticateJWT, retrieveTaskList);
// GET /tasks/:id: Retrieve a specific task by its ID //
userRouter.get("/task/:id", authenticateJWT, retrieveSpecificTask);
// POST /tasks: Create a new task //
userRouter.post("/task", authenticateJWT, creatNewTask);
// PUT /tasks/:id: Update a task by its ID
userRouter.put("/task/:id", authenticateJWT, updateTaskWithID);
// DELETE /tasks/:id: Delete a task by its ID
userRouter.delete("/task/:id", authenticateJWT, deleteTaskWithID);

export default userRouter;
