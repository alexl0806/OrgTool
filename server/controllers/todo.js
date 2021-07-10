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
