import mongoose from "mongoose";

const todoItemSchema = mongoose.Schema({
  title: {
    type: String,
    default: "Task",
  },
  label: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dateDue: {
    type: Date,
    default: new Date(),
  },
  priority: Number,
  repeatOption: String,
  repeatDaily: Date,
  repeatWeekly: {
    time: Date,
    day: [],
  },
  repeatMonthly: Date,
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
