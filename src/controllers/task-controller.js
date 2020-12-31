import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";
export const findAllTask = async (req, res) => {
  try {
    const { size, page, title } = req.query;

    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const { limit, offset } = getPagination(page, size);

    const data = await Task.paginate(condition, { offset, limit });

    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const findAllDoneTask = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const findOneTask = async (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const task = await Task.findById(id);
      if (!task)
        return res
          .status(400)
          .json({ message: `Task with id ${id} does not exist` });
      res.json(task);
      return next();
    } catch (error) {
      res.status(500).json({
        message: error.message || `Error retrieving task with id ${id}`,
      });
      return next();
    }
  }

  res.status(400).json({ message: "Invalid ID" });
};

export const createTask = async (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Empty title" });
  }
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done || false,
    });
    const taskSaved = await newTask.save();

    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating a task",
    });
    return next();
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask)
      return res
        .status(400)
        .json({ message: `Task with id ${id} does not exist` });
    res.json(`Task deleted successfully`);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error deleting task with id ${id}`,
    });
    return next();
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body);
    if (!updatedTask)
      return res
        .status(400)
        .json({ message: `Task with id ${id} does not exist` });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error updating task with id ${id}`,
    });
    return next();
  }
};
