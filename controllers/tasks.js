const Task = require('./../models/Task');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}, { __v: false });
    res.status(200).json({
      result: tasks.length,
      status: 'success',
      tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: `no task with id: ${taskID}`,
      });
    }

    res.status(200).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: taskID },
      req.body,
      {
        new: true, //* this will make us get the updated task
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: `no task with id: ${taskID}`,
      });
    }

    res.status(200).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: `no task with id: ${taskID}`,
      });
    }

    res.status(204).json({
      status: 'success',
      task: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
