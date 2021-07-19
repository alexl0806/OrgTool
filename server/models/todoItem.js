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
  repeatOption: {
    type: String,
    enum: ["None", "Daily", "Weekly", "Monthly"],
    default: "None",
  },
  repeatDaily: Date,
  repeatWeekly: {
    type: Object,
    time: Date,
    day: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  },
  repeatMonthly: Date,
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
