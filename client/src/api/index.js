import axios from "axios";

const flashcardsURL = "http://localhost:5000/flashcards";
const todoURL = "http://localhost:5000/todo";

export const fetchTodos = () => axios.get(todoURL);
