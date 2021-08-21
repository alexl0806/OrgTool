import {
  FETCH_ALL,
  CREATE,
  UPDATE_TODO,
  DELETE,
  TOKEN_EXPIRY_ERROR,
} from "../constants/actionTypes";

export default (state = { todos: [], error: false }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, todos: action.payload };
    case CREATE:
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    case DELETE:
      return {
        ...state,
        todos: state.todos.filter((post) => post._id !== action.payload),
      };
    case TOKEN_EXPIRY_ERROR:
      return { ...state, todos: [], error: true };
    default:
      return state;
  }
};
