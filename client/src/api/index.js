import axios from "axios";

const flashcardsURL = "http://localhost:5000/flashcards";
const todoURL = "http://localhost:5000/todo";

export const fetchTodos = () => axios.get(todoURL);
export const createTodo = () => axios.post(todoURL);
export const updateTodo = (id, updatedTodo) =>
  axios.patch(`${todoURL}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${todoURL}/${id}`);
