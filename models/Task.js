const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 character'],
  },
  completed: {
    type: Boolean,
    default : false
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
