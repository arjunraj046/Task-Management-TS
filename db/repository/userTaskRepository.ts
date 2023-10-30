import { FindOneOptions, getRepository } from "typeorm";
import { TaskSchema } from "../models/task";

// GET /tasks: Retrieve a list of all tasks
export const retrieveUserTaskList_DB = async (id: number) => {
  const TaskRepository = getRepository(TaskSchema);
  try {
    const tasks = await TaskRepository.find({
      where: {
        userId: id,
      },
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};

// GET /tasks/:id: Retrieve a specific task by its ID
export const retrieveSpecificTask_DB = async (userId: number, taskId: number) => {
  const TaskRepository = getRepository(TaskSchema);
  try {
    const options: FindOneOptions<TaskSchema> = {
      where: { id: taskId, userId: userId },
    };
    const response = await TaskRepository.findOne(options);
    return response;
  } catch (error) {
    throw error;
  }
};

// POST /tasks: Create a new task
export const creatNewTask_DB = async (userId: number, title: string, description: string, dueDate: string) => {
  const TaskRepository = getRepository(TaskSchema);
  try {
    const response = await TaskRepository.save({
      userId: userId,
      title: title,
      description: description,
      dueDate: dueDate,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// PUT /tasks/:id: Update a task by its ID
export const updateTaskWithID_DB = async (userId: number, taskId: number, title: string, description: string, dueDate: string, completed: boolean) => {
  const TaskRepository = getRepository(TaskSchema);
  try {
    const options: FindOneOptions<TaskSchema> = {
      where: { id: taskId, userId: userId },
    };

    const task = await TaskRepository.findOne(options);
    if (!task) {
      return null;
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.completed = completed;

    const updatedTask = await TaskRepository.save(task);

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

// DELETE /tasks/:id: Delete a task by its ID
export const deleteTaskWithID_DB = async (userId: number, taskId: number) => {
  const TaskRepository = getRepository(TaskSchema);
  try {
    const options: FindOneOptions<TaskSchema> = {
      where: { id: taskId, userId: userId },
    };
    const task = await TaskRepository.findOne(options);
    if (!task) {
      return null;
    }
    await TaskRepository.remove(task);
    return task;
  } catch (error) {
    throw error;
  }
};
