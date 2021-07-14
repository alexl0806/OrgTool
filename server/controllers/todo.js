import mongoose from "mongoose";
import TodoItem from "../models/todoItem.js";

export const getTodo = async (req, res) => {
  try {
    const todoItems = await TodoItem.find();

    res.status(200).json(todoItems);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createTodo = async (req, res) => {
  const body = req.body;

  const newTodo = new TodoItem(body);

  try {
    await newTodo.save();

    res.status(200).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatedTodo = await TodoItem.findByIdAndUpdate(
    id,
    { ...todo, _id: id },
    {
      new: true,
    }
  );

  res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await TodoItem.findByIdAndRemove(id);

  res.json({ message: "Task deleted successfully" });
};
