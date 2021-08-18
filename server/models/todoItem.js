import mongoose from "mongoose";

const todoItemSchema = mongoose.Schema({
  title: {
    type: String,
    default: "Task",
  },
  creator: String,
  tags: [String],
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dateDue: {
    type: Date,
    default: new Date(),
  },
  priority: {
    type: Number,
    default: 3,
  },
  repeatOption: {
    type: String,
    enum: ["None", "Daily", "Weekly", "Monthly"],
    default: "None",
  },
  repeatWeekly: Number,
  repeatMonthly: Number,
  checked: {
    type: Boolean,
    default: false,
  },
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
