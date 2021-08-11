import {
  FETCH_ALL,
  CREATE,
  UPDATE_TODO,
  DELETE,
} from "../constants/actionTypes";

export default (todos = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...todos, action.payload];
    case UPDATE_TODO:
      return todos.map((todo) =>
        todo._id === action.payload ? action.payload : todo
      );
    case DELETE:
      return todos.filter((post) => post._id !== action.payload);
    default:
      return todos;
  }
};
