import mongoose from "mongoose";

const todoItemSchema = mongoose.Schema({
  task: String,
  label: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  //Singular task
  singular: {
    dateDue: Date,
    priority: Number,
  },
  //Repeating task
  repeating: {
    repeatOption: String,
    repeatDaily: Date,
    repeatWeekly: {
      time: Date,
      day: [],
    },
    repeatMonthly: Date,
  },
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
