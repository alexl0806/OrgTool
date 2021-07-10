import mongoose from "mongoose";

const todoItemSchema = mongoose.Schema({
  task: String,
  dateDue: Date,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
