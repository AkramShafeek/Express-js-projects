const Task = require('../database/models/Task');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customError');

const getAllTasks = asyncWrapper(async (req, res, next) => {
  let tasks = await Task.find();
  res.status(200).json({ tasks: tasks });
})

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });

  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });

  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
})


module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask
};