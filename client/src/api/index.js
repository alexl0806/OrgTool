import axios from "axios";

const flashcardsURL = "http://localhost:5000/flashcards";
const todoURL = "http://localhost:5000/todo";

export const fetchTodos = () => axios.get(todoURL);
export const createTodo = (newTodo) => axios.post(todoURL, newTodo);
export const updateTodo = (id, updatedTodo) =>
  axios.patch(`${todoURL}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${todoURL}/${id}`);
