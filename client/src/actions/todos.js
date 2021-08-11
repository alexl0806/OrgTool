import {
  FETCH_ALL,
  CREATE,
  UPDATE_TODO,
  DELETE,
} from "../constants/actionTypes";
import * as api from "../api";

//Action Creators
export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = (newTodo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(newTodo);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, todo);

    dispatch({ type: UPDATE_TODO, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
