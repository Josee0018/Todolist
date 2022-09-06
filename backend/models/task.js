const mongoose = require("mongoose");
// const { Schema } = mongoose;

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed:{
    type:Boolean,
    required:true,
    default:false,
  },
  checked:{
    type:Boolean,
    required:true,
    default:false,
  }
});

const TasksDB = mongoose.model("Task", taskSchema);
module.exports = TasksDB;
