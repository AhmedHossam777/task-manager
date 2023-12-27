const Task = require('./../models/Task');
const asyncWrapper = require('./../middlewares/async');
const AppError = require('../utils/app-error');

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({}, { __v: false });
  res.status(200).json({
    status: 'success',
    result: tasks.length,
    tasks,
  });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    task,
  });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(new AppError(`no task with id: ${taskID}`, 404));
  }

  res.status(200).json({
    status: 'success',
    task,
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //* this will make us get the updated task
    runValidators: true,
  });
  if (!task) {
    return next(new AppError(`no task with id: ${taskID}`, 404));
  }

  res.status(200).json({
    status: 'success',
    task,
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(new AppError(`no task with id: ${taskID}`, 404));
  }

  res.status(204).json({
    status: 'success',
    task: null,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
