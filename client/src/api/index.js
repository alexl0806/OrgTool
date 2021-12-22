import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchTodos = (id) => API.get(`/todo/${id}`);
export const createTodo = (newTodo) => API.post("/todo", newTodo);
export const updateTodo = (id, updatedTodo) =>
  API.patch(`/todo/${id}`, updatedTodo);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const forgetPass = (formData) => API.post("/user/resetPass", formData);
export const refreshToken = (formData) =>
  API.post("/user/refreshToken", formData);

export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);
