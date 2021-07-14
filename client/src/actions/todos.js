import * as api from "../api";

//Action Creators
export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = (newTodo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(newTodo);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
