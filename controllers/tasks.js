const getAllTasks = (req, res, next) => {
  res.send('get all tasks');
};

const createTask = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};

const getTask = (req, res, next) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res, next) => {
  res.send('update task');
};

const deleteTask = (req, res, next) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
